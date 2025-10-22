# create-react-adam

Create opinionated React apps with TypeScript, Vite, Wouter, and Tailwind CSS.

## Quick Start

```bash
npx create-react-adam@latest my-app
cd my-app
npm run dev
```

## CLI Options

- `--dir <path>` - Create the project in a specific directory

  ```bash
  npm create react-adam@latest my-app --dir ~/projects
  ```

- `--with-e2e` - Include E2E testing setup without prompting

  ```bash
  npm create react-adam@latest my-app --with-e2e
  ```

- `--no-e2e` - Skip E2E testing setup without prompting
  ```bash
  npm create react-adam@latest my-app --no-e2e
  ```

## What's Included

### Core Stack

- **React** - Latest version with TypeScript support
- **Vite** - Lightning-fast development server with HMR
- **Wouter** - Minimalist client-side routing (~1.3kB)
- **Tailwind CSS 4** - Utility-first CSS
- **React Icons** - Popular icon library

### Code Quality Tools

#### ESLint

Configured with a modern flat config (`eslint.config.js`) that includes:

- **TypeScript ESLint** - Recommended and strict presets for type-safe code
- **React Hooks** - Ensures correct hooks usage patterns
- **React Refresh** - Validates fast refresh compatibility
- **JSX Accessibility** - Enforces accessibility best practices (a11y)
- **Prettier integration** - Disables conflicting formatting rules

Why ESLint? It catches bugs early, enforces consistent code patterns, and integrates seamlessly with TypeScript. The strict preset helps maintain high code quality standards.

#### Prettier

Configured with two powerful plugins:

- **prettier-plugin-organize-imports** - Automatically sorts and removes unused imports
- **prettier-plugin-tailwindcss** - Sorts Tailwind class names consistently

Why Prettier? It eliminates debates about code style by automatically formatting code. The organize-imports plugin keeps imports clean, and the Tailwind plugin ensures class names follow the recommended ordering.

### Optional E2E Testing

When you include E2E testing (via prompt or `--with-e2e` flag), you get:

- **Playwright** - Modern, reliable E2E testing framework
- **Allure Reports** - Beautiful, detailed test reports
- Pre-configured test setup with example tests
- HTML reports and Allure integration

### Dependency Management

- **Exact version pinning** - All dependencies use exact versions (no `^` or `~`)
- **`.npmrc` configuration** - Ensures `save-exact=true` for all future installs
- **Renovate-friendly** - Compatible with automated dependency updates

### GitHub Actions Workflows

Two CI workflows are included in the generated projects:

1. **Code Checks** (`.github/workflows/check.yml`)

   - TypeScript type checking
   - Prettier formatting validation
   - ESLint linting
   - Production build verification

2. **E2E Tests** (`.github/workflows/e2e.yml`) - if E2E is included
   - Runs Playwright tests in CI
   - Uploads test reports as artifacts
   - Configures Allure results

## Available Scripts

### Development

#### `npm run dev`

Starts the Vite development server with hot module replacement.

#### `npm run build`

Builds the app for production to the `dist` folder. Runs TypeScript compiler and Vite build.

#### `npm run preview`

Previews the production build locally.

### Code Quality

#### `npm run lint`

Runs ESLint and automatically fixes issues where possible.

#### `npm run lint:check`

Runs ESLint without fixing issues. Useful for CI environments.

#### `npm run format`

Formats all files with Prettier, organizing imports and sorting Tailwind classes.

#### `npm run format:check`

Checks if files are formatted correctly without modifying them. Useful for CI environments.

### E2E Testing (if included)

#### `npm run test:e2e`

Runs all Playwright E2E tests headlessly.

#### `npm run test:e2e:ui`

Opens Playwright's interactive UI mode for debugging tests.

#### `npm run test:e2e:report`

Generates and opens the Allure test report.

### Troubleshooting

#### `npm run itDoesNotWork`

Runs basic troubleshooting checks:

- Installs dependencies
- Checks if Vite dev server is running
- Provides helpful diagnostic information

## Project Structure

```
my-app/
├── src/
│   ├── pages/          # Page components
│   │   ├── Home/
│   │   └── About/
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── app.css         # Tailwind directives
├── e2e/                # E2E tests (optional)
├── .github/            # GitHub Actions workflows
└── package.json
```

## Why This Stack?

- **Modern**: Latest versions of React, Vite, and Tailwind
- **Lightweight**: Minimal dependencies, under 1MB node_modules (before dev deps)
- **Type-safe**: Full TypeScript support with strict checking
- **Fast**: Vite's instant HMR and optimized builds
- **Accessible**: Built-in a11y linting ensures inclusive UIs
- **Maintainable**: Automated formatting and linting prevent technical debt
- **CI-ready**: Workflows for testing and validation out of the box

## License

MIT
