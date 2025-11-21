#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, mkdir, readFile, writeFile, copyFile, stat, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { spawn } from 'child_process';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

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
      if (nextArg && !nextArg.startsWith('--')) {
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

async function copyDirectory(src, dest, excludePaths = []) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    const shouldExclude = excludePaths.some(excludePath => {
      if (entry.isDirectory() && entry.name === excludePath) {
        return true;
      }
      return srcPath.endsWith(`/${excludePath}`) || srcPath.endsWith(`\\${excludePath}`);
    });

    if (shouldExclude) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, excludePaths);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
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

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  const { projectName, flags } = parseArgs(args);

  const validationError = validateProjectName(projectName);
  if (validationError) {
    console.error(`Error: ${validationError}`);
    console.log('\nUsage: npm create react-adam@latest <project-name> [options]');
    console.log('\nOptions:');
    console.log('  --dir <path>       Create the project in a specific directory');
    console.log('  --with-e2e         Include E2E testing setup (Playwright + Allure)');
    console.log('  --no-e2e           Skip E2E testing setup');
    console.log('  --with-utils       Include utility functions (classNames, Storage, useUrlState)');
    console.log('  --no-utils         Skip utility functions');
    process.exit(1);
  }

  const baseDir = flags.dir || flags.directory || process.cwd();
  const projectPath = join(baseDir, projectName);

  if (existsSync(projectPath)) {
    console.error(`Error: Directory "${projectName}" already exists`);
    process.exit(1);
  }

  let includeE2E = false;
  if (flags['with-e2e']) {
    includeE2E = true;
  } else if (flags['no-e2e']) {
    includeE2E = false;
  } else {
    const answer = await askQuestion('Include E2E testing setup (Playwright + Allure)? (y/N): ');
    includeE2E = answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  }

  let includeUtils = false;
  if (flags['with-utils']) {
    includeUtils = true;
  } else if (flags['no-utils']) {
    includeUtils = false;
  } else {
    const answer = await askQuestion('Include utility functions (classNames, Storage, useUrlState)? (y/N): ');
    includeUtils = answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  }

  console.log(`Creating a new Adam React app in ${projectPath}...`);

  const templatePath = join(__dirname, '..', 'template');
  const excludePaths = [];
  
  if (!includeE2E) {
    excludePaths.push('e2e');
  }

  if (!includeUtils) {
    excludePaths.push('utils');
  }

  await copyDirectory(templatePath, projectPath, excludePaths);

  if (!includeUtils) {
    await copyFile(
      join(projectPath, 'src', 'pages', 'Home', 'index.no-utils.tsx'),
      join(projectPath, 'src', 'pages', 'Home', 'index.tsx')
    );
    await copyFile(
      join(projectPath, 'src', 'pages', 'About', 'index.no-utils.tsx'),
      join(projectPath, 'src', 'pages', 'About', 'index.tsx')
    );
    await rm(join(projectPath, 'src', 'pages', 'Home', 'index.no-utils.tsx'));
    await rm(join(projectPath, 'src', 'pages', 'About', 'index.no-utils.tsx'));
  } else {
    await rm(join(projectPath, 'src', 'pages', 'Home', 'index.no-utils.tsx'));
    await rm(join(projectPath, 'src', 'pages', 'About', 'index.no-utils.tsx'));
  }

  const replacements = {
    '__PROJECT_NAME__': projectName
  };

  await replaceInFile(join(projectPath, 'package.json'), replacements);
  await replaceInFile(join(projectPath, 'index.html'), replacements);
  await replaceInFile(join(projectPath, 'README.md'), replacements);

  console.log('\nInstalling dependencies...');
  await runCommand('npm', ['install'], projectPath);

  if (includeE2E) {
    console.log('\nInstalling E2E dependencies...');
    await runCommand('npm', ['install'], join(projectPath, 'e2e'));
  }

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
  
  if (includeE2E) {
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

