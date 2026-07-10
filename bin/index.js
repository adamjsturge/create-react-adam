#!/usr/bin/env node

import * as p from '@clack/prompts';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { chmod, copyFile, mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

const FEATURES = [
  {
    id: 'e2e',
    flag: 'e2e',
    label: 'E2E testing (Playwright + Allure)'
  },
  {
    id: 'utils',
    flag: 'utils',
    label: 'Utility functions (classNames, Storage, useUrlState, safeTimeout)'
  },
  {
    id: 'lighthouse',
    flag: 'lighthouse',
    label: 'Lighthouse CI workflow (a11y/SEO/performance budgets)'
  },
  {
    id: 'webpLint',
    flag: 'webp-lint',
    label: 'ESLint rule: prefer WebP images'
  }
];

// Flags that consume the next argument as their value; all others are boolean.
const VALUE_FLAGS = new Set(['dir', 'directory']);

const PRE_COMMIT_HOOK = `#!/bin/bash

STAGED_JS_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(tsx?|js)$' || true)

if [ -n "$STAGED_JS_FILES" ]; then
  echo "$STAGED_JS_FILES" | xargs npx prettier --write --ignore-unknown || exit 1
  echo "$STAGED_JS_FILES" | xargs npx eslint --fix || exit 1
  echo "$STAGED_JS_FILES" | xargs git add
fi
`;

function parseArgs(args) {
  const parsed = {
    projectName: null,
    flags: {}
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      if (VALUE_FLAGS.has(key) && nextArg && !nextArg.startsWith('--')) {
        parsed.flags[key] = nextArg;
        i++;
      } else {
        parsed.flags[key] = true;
      }
    } else if (!parsed.projectName) {
      parsed.projectName = arg;
    }
  }

  return parsed;
}

function validateProjectName(name) {
  if (!name) {
    return 'Project name is required';
  }
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  return null;
}

function printUsage() {
  console.log('\nUsage: npm create react-adam@latest <project-name> [options]');
  console.log('\nOptions:');
  console.log('  --dir <path>          Create the project in a specific directory');
  console.log('  --yes                 Skip the wizard; include every feature not disabled by a flag');
  console.log('  --with-e2e            Include E2E testing setup (Playwright + Allure)');
  console.log('  --no-e2e              Skip E2E testing setup');
  console.log('  --with-utils          Include utility functions (classNames, Storage, useUrlState)');
  console.log('  --no-utils            Skip utility functions');
  console.log('  --with-lighthouse     Include Lighthouse CI workflow');
  console.log('  --no-lighthouse       Skip Lighthouse CI workflow');
  console.log('  --with-webp-lint      Include the prefer-webp-images ESLint rule');
  console.log('  --no-webp-lint        Skip the prefer-webp-images ESLint rule');
}

async function resolveFeatures(flags) {
  const resolved = {};

  for (const feature of FEATURES) {
    if (flags[`with-${feature.flag}`]) {
      resolved[feature.id] = true;
    } else if (flags[`no-${feature.flag}`]) {
      resolved[feature.id] = false;
    }
  }

  const unresolved = FEATURES.filter((feature) => resolved[feature.id] === undefined);
  if (unresolved.length === 0) {
    return resolved;
  }

  const isNonInteractive = flags.yes || !process.stdin.isTTY || !process.stdout.isTTY;
  if (isNonInteractive) {
    for (const feature of unresolved) {
      resolved[feature.id] = true;
    }
    return resolved;
  }

  p.intro('create-react-adam');
  const selected = await p.multiselect({
    message: 'Select features',
    options: unresolved.map((feature) => ({
      value: feature.id,
      label: feature.label
    })),
    initialValues: unresolved.map((feature) => feature.id),
    required: false
  });

  if (p.isCancel(selected)) {
    p.cancel('Scaffold cancelled.');
    process.exit(1);
  }

  for (const feature of unresolved) {
    resolved[feature.id] = selected.includes(feature.id);
  }
  return resolved;
}

// Local dev/build artifacts that must never be copied into a scaffold
// (npm excludes most of these from the published package anyway).
const ALWAYS_SKIP = new Set([
  'node_modules',
  'dist',
  '.DS_Store',
  'package-lock.json',
  'playwright-report',
  'test-results',
  'allure-results'
]);

async function copyDirectory(src, dest, excludePaths = [], root = src) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ALWAYS_SKIP.has(entry.name)) {
      continue;
    }
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    const relPath = relative(root, srcPath).split(sep).join('/');

    if (excludePaths.includes(relPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, excludePaths, root);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function replaceInFile(filePath, replacements) {
  let content = await readFile(filePath, 'utf-8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key, 'g'), value);
  }
  await writeFile(filePath, content, 'utf-8');
}

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

function runCommandQuiet(command, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'ignore'
    });

    child.on('error', () => resolve(-1));
    child.on('close', (code) => resolve(code));
  });
}

async function setupGit(projectPath) {
  const gitAvailable = (await runCommandQuiet('git', ['--version'])) === 0;
  if (!gitAvailable) {
    console.log('\nGit not found; skipping repository setup.');
    return;
  }

  const insideRepo =
    (await runCommandQuiet('git', ['rev-parse', '--is-inside-work-tree'], projectPath)) === 0;
  if (insideRepo) {
    console.log(
      '\nAlready inside a git repository; skipping git init.' +
        '\nAfter setting up your own repo, run: npm run setFormatToPrecommitHook'
    );
    return;
  }

  try {
    await runCommand('git', ['init', '--quiet'], projectPath);

    const hookPath = join(projectPath, '.git', 'hooks', 'pre-commit');
    await writeFile(hookPath, PRE_COMMIT_HOOK, 'utf-8');
    await chmod(hookPath, 0o755);

    await runCommand('git', ['add', '-A'], projectPath);
    await runCommand(
      'git',
      ['commit', '--quiet', '-m', 'Initial commit from create-react-adam'],
      projectPath
    );
    console.log('\nInitialized a git repository with a formatting pre-commit hook.');
  } catch (error) {
    console.warn(
      `\nWarning: git setup did not complete (${error.message}).` +
        '\nYou can finish it manually with: git init && git add -A && git commit' +
        '\nThen run: npm run setFormatToPrecommitHook'
    );
  }
}

async function main() {
  const { projectName, flags } = parseArgs(args);

  const validationError = validateProjectName(projectName);
  if (validationError) {
    console.error(`Error: ${validationError}`);
    printUsage();
    process.exit(1);
  }

  const baseDir = flags.dir || flags.directory || process.cwd();
  const projectPath = join(baseDir, projectName);

  if (existsSync(projectPath)) {
    console.error(`Error: Directory "${projectName}" already exists`);
    process.exit(1);
  }

  const features = await resolveFeatures(flags);

  console.log(`Creating a new Adam React app in ${projectPath}...`);
  const enabled = FEATURES.filter((feature) => features[feature.id]);
  console.log(
    enabled.length > 0
      ? `Features: ${enabled.map((feature) => feature.label).join(', ')}`
      : 'Features: none (core stack only)'
  );

  const templatePath = join(__dirname, '..', 'template');
  const excludePaths = [];

  if (!features.e2e) {
    excludePaths.push('e2e', '.github/workflows/e2e.yml');
  }
  if (!features.utils) {
    excludePaths.push('src/utils');
  }
  if (!features.lighthouse) {
    excludePaths.push('.github/workflows/lighthouse.yml', 'lighthouserc.json');
  }
  if (!features.webpLint) {
    excludePaths.push('eslint-rules');
  }

  let createdProjectDir = false;
  try {
    createdProjectDir = true;
    await copyDirectory(templatePath, projectPath, excludePaths);

    // npm never publishes .gitignore/.npmrc files, so the template ships them
    // without the leading dot and we restore the real names here.
    const dotfileRenames = [
      ['gitignore', '.gitignore'],
      ['npmrc', '.npmrc'],
      [join('e2e', 'gitignore'), join('e2e', '.gitignore')]
    ];
    for (const [from, to] of dotfileRenames) {
      const fromPath = join(projectPath, from);
      if (existsSync(fromPath)) {
        await copyFile(fromPath, join(projectPath, to));
        await rm(fromPath);
      }
    }

    // Resolve .no-utils page variants
    for (const page of ['Home', 'About']) {
      const variantPath = join(projectPath, 'src', 'pages', page, 'index.no-utils.tsx');
      if (!features.utils) {
        await copyFile(variantPath, join(projectPath, 'src', 'pages', page, 'index.tsx'));
      }
      await rm(variantPath);
    }

    // Resolve the eslint config variant (with or without the WebP rule)
    const noWebpConfigPath = join(projectPath, 'eslint.config.no-webp.js');
    if (!features.webpLint) {
      await copyFile(noWebpConfigPath, join(projectPath, 'eslint.config.js'));
    }
    await rm(noWebpConfigPath);

    // README.md uses {{PROJECT_NAME}} because Prettier's markdown formatter
    // rewrites __PROJECT_NAME__ (underscore emphasis) to **PROJECT_NAME**.
    const replacements = {
      __PROJECT_NAME__: projectName,
      '{{PROJECT_NAME}}': projectName
    };

    const filesToReplace = [
      'package.json',
      'index.html',
      'README.md',
      join('src', 'pages', 'Home', 'index.tsx'),
      join('src', 'pages', 'About', 'index.tsx'),
      join('src', 'pages', 'NotFound', 'index.tsx')
    ];
    for (const file of filesToReplace) {
      await replaceInFile(join(projectPath, file), replacements);
    }

    console.log('\nInstalling dependencies...');
    await runCommand('npm', ['install'], projectPath);

    if (features.e2e) {
      console.log('\nInstalling E2E dependencies...');
      await runCommand('npm', ['install'], join(projectPath, 'e2e'));
    }
  } catch (error) {
    if (createdProjectDir) {
      await rm(projectPath, { recursive: true, force: true });
      console.error(`\nScaffolding failed; removed ${projectPath}`);
    }
    throw error;
  }

  await setupGit(projectPath);

  console.log('\n✓ Success! Created', projectName, 'at', projectPath);
  console.log('\nInside that directory, you can run several commands:\n');
  console.log('  npm run dev');
  console.log('    Starts the development server.\n');
  console.log('  npm run build');
  console.log('    Builds the app for production.\n');
  console.log('  npm run preview');
  console.log('    Previews the production build.\n');
  console.log('  npm run lint');
  console.log('    Runs the linter.\n');

  if (features.e2e) {
    console.log('  npm run test:e2e');
    console.log('    Runs E2E tests with Playwright.\n');
    console.log('  npm run test:e2e:ui');
    console.log('    Opens Playwright UI mode.\n');
    console.log('  npm run test:e2e:report');
    console.log('    Generates and opens Allure report.\n');
  }

  console.log('We suggest that you begin by typing:\n');
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev\n');
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
