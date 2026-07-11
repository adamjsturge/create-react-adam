#!/usr/bin/env node

// Asserts that a scaffolded app has exactly the shape its feature combo
// promises: expected files present, excluded files absent, template
// artifacts cleaned up, and placeholders replaced.
//
// Usage: node scripts/verify-scaffold.mjs <appDir> <full|bare>
//   full = scaffolded with --yes (every feature on)
//   bare = scaffolded with --no-e2e --no-utils --no-lighthouse
//          --no-webp-lint --no-pwa

import { existsSync, readFileSync } from 'fs';
import { basename, join, resolve } from 'path';

const [appDirArg, combo] = process.argv.slice(2);

if (!appDirArg || !['full', 'bare'].includes(combo)) {
  console.error('Usage: node scripts/verify-scaffold.mjs <appDir> <full|bare>');
  process.exit(1);
}

const appDir = resolve(appDirArg);
const appName = basename(appDir);
const failures = [];

function present(path) {
  if (!existsSync(join(appDir, path))) {
    failures.push(`missing: ${path}`);
  }
}

function absent(path) {
  if (existsSync(join(appDir, path))) {
    failures.push(`should not exist: ${path}`);
  }
}

function read(path) {
  try {
    return readFileSync(join(appDir, path), 'utf-8');
  } catch {
    failures.push(`unreadable: ${path}`);
    return '';
  }
}

function contains(path, text) {
  if (!read(path).includes(text)) {
    failures.push(`${path} should contain "${text}"`);
  }
}

function lacks(path, text) {
  if (read(path).includes(text)) {
    failures.push(`${path} should not contain "${text}"`);
  }
}

// --- Always present, regardless of combo
const COMMON_PRESENT = [
  '.gitignore',
  '.npmrc',
  '.nvmrc',
  '.prettierrc',
  'eslint.config.js',
  'index.html',
  'package.json',
  'README.md',
  'tsconfig.json',
  'vite.config.ts',
  'src/App.tsx',
  'src/main.tsx',
  'src/app.css',
  'src/routes.ts',
  'src/components/Button.tsx',
  'src/components/PreloadLink.tsx',
  'src/types/ui.ts',
  'src/pages/Home/index.tsx',
  'src/pages/About/index.tsx',
  'src/pages/NotFound/index.tsx',
  'public/favicon.svg',
  'public/fonts/InterVariable.woff2',
  'public/robots.txt',
  '.github/workflows/check.yml'
];

// --- Template artifacts that must never survive scaffolding
const COMMON_ABSENT = [
  'gitignore',
  'npmrc',
  'eslint.config.no-webp.js',
  'vite.config.no-pwa.ts',
  'src/pages/Home/index.no-utils.tsx',
  'src/pages/About/index.no-utils.tsx',
  '.DS_Store'
];

// --- Per-feature files (present in full, absent in bare)
const FEATURE_FILES = [
  'e2e/package.json',
  'e2e/playwright.config.ts',
  'e2e/example.spec.ts',
  'e2e/.gitignore',
  '.github/workflows/e2e.yml',
  '.github/workflows/lighthouse.yml',
  'lighthouserc.json',
  'eslint-rules/prefer-webp-images.js',
  'src/utils/classNames.ts',
  'src/utils/Storage.ts',
  'src/utils/useUrlState.ts',
  'src/utils/Internet.ts',
  'src/utils/helpers.ts'
];

COMMON_PRESENT.forEach(present);
COMMON_ABSENT.forEach(absent);

if (combo === 'full') {
  FEATURE_FILES.forEach(present);
  absent('e2e/gitignore');
  contains('eslint.config.js', 'adamjsturge/prefer-webp-images');
  // PWA on: vite config uses the plugin and the manifest carries the app
  // name; the dependency must be installed.
  contains('vite.config.ts', 'VitePWA');
  contains('vite.config.ts', `name: "${appName}"`);
  contains('package.json', '"vite-plugin-pwa"');
} else {
  FEATURE_FILES.forEach(absent);
  absent('e2e');
  absent('src/utils');
  absent('eslint-rules');
  lacks('eslint.config.js', 'adamjsturge');
  // PWA off: no trace of the plugin in the vite config or dependencies.
  lacks('vite.config.ts', 'VitePWA');
  lacks('package.json', 'vite-plugin-pwa');
}

// --- Placeholder replacement
const REPLACED_FILES = [
  'package.json',
  'index.html',
  'README.md',
  'vite.config.ts',
  'src/pages/Home/index.tsx',
  'src/pages/About/index.tsx',
  'src/pages/NotFound/index.tsx'
];
for (const file of REPLACED_FILES) {
  lacks(file, '__PROJECT_NAME__');
  lacks(file, '{{PROJECT_NAME}}');
}
contains('package.json', `"name": "${appName}"`);
contains('README.md', `# ${appName}`);
contains('index.html', `<title>${appName}</title>`);

// --- .npmrc must keep installs exact (the file npm strips from tarballs)
contains('.npmrc', 'save-exact=true');

if (failures.length > 0) {
  console.error(`✗ ${appName} (${combo}) failed ${failures.length} check(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`✓ ${appName} (${combo}) has the expected shape`);
