# create-react-adam

Create opinionated React apps with TypeScript, Vite, Wouter, and Tailwind CSS.

## Quick Start

```bash
npx create-react-adam@latest my-app --yes
cd my-app
npm run dev
```

Running without flags opens an interactive wizard where you pick features
(all pre-selected by default):

```
◆ Select features
│ ◼ E2E testing (Playwright + Allure)
│ ◼ Utility functions (classNames, Storage, useUrlState, safeTimeout)
│ ◼ Lighthouse CI workflow (a11y/SEO/performance budgets)
│ ◼ ESLint rule: prefer WebP images
└
```

## CLI Options

- `--dir <path>` - Create the project in a specific directory

  ```bash
  npm create react-adam@latest my-app --dir ~/projects
  ```

- `--yes` - Skip the wizard and include every feature not explicitly disabled
  by a flag. This is also the behavior when there is no TTY (CI, scripts, AI
  agents), so the CLI never hangs waiting for input.

  ```bash
  npm create react-adam@latest my-app --yes --no-e2e
  ```

- `--with-e2e` / `--no-e2e` - Include or skip E2E testing (Playwright + Allure)
- `--with-utils` / `--no-utils` - Include or skip utility functions
- `--with-lighthouse` / `--no-lighthouse` - Include or skip the Lighthouse CI workflow
- `--with-webp-lint` / `--no-webp-lint` - Include or skip the prefer-webp-images ESLint rule

Any feature answered by a flag is removed from the wizard; if all four are
answered, the wizard is skipped entirely.

## What's Included

### Core Stack

- **React** - Latest version with TypeScript support
- **Vite** - Lightning-fast development server with HMR
- **Wouter** - Minimalist client-side routing (~1.3kB)
- **Tailwind CSS 4** - Utility-first CSS
- **React Icons** - Popular icon library

### Performance, SEO, and Accessibility Baseline

Every generated project starts with:

- **Self-hosted Inter font** - variable `woff2` served from `public/fonts/`
  with `font-display: swap` and a preload hint; no third-party font requests
- **Route-level code splitting with preloading** - pages load via
  `React.lazy` + `Suspense`; chunks preload on link hover/focus/touch and an
  idle prefetcher warms the rest after first paint (documented in the
  generated README, easy to remove)
- **SEO-ready `index.html`** - meta description, Open Graph and Twitter card
  tags, theme-color, plus a `public/robots.txt`
- **Accessible shell** - skip-to-content link, `<main>` landmark, visible
  `:focus-visible` styles, and per-route document titles

### Code Quality Tools

#### ESLint

Configured with a modern flat config (`eslint.config.js`) that includes:

- **TypeScript ESLint** - Recommended and strict presets for type-safe code
- **React Hooks** - Ensures correct hooks usage patterns
- **React Refresh** - Validates fast refresh compatibility
- **JSX Accessibility** - Enforces accessibility best practices (a11y)
- **Prettier integration** - Disables conflicting formatting rules
- **prefer-webp-images** (optional) - a local custom rule that errors on
  references to `.png`/`.jpg`/`.jpeg`/`.gif`/`.bmp` images and suggests
  converting them at [tools.sturge.dev/webp](https://tools.sturge.dev/webp)

#### Prettier

Configured with two powerful plugins:

- **prettier-plugin-organize-imports** - Automatically sorts and removes unused imports
- **prettier-plugin-tailwindcss** - Sorts Tailwind class names consistently

### Optional E2E Testing

When you include E2E testing (via wizard or `--with-e2e` flag), you get:

- **Playwright** - Modern, reliable E2E testing framework
- **Allure Reports** - Beautiful, detailed test reports
- Pre-configured test setup with example tests
- HTML reports and Allure integration

### Git Integration

After scaffolding (when not already inside a git repository), the CLI:

1. Runs `git init`
2. Installs a pre-commit hook that formats and lints staged files
   (the same hook as `npm run setFormatToPrecommitHook`)
3. Creates an initial commit

### Dependency Management

- **Exact version pinning** - All dependencies use exact versions (no `^` or `~`)
- **`.npmrc` configuration** - Ensures `save-exact=true` for all future installs
- **Renovate-friendly** - Compatible with automated dependency updates

### GitHub Actions Workflows

Up to three CI workflows are included in generated projects:

1. **Code Checks** (`.github/workflows/check.yml`)

   - TypeScript type checking
   - Prettier formatting validation
   - ESLint linting
   - Production build verification

2. **E2E Tests** (`.github/workflows/e2e.yml`) - if E2E is included

   - Runs Playwright tests in CI
   - Uploads test reports as artifacts
   - Configures Allure results

3. **Lighthouse CI** (`.github/workflows/lighthouse.yml`) - if Lighthouse is included
   - Builds the app and audits it with Lighthouse
   - Fails CI below score budgets: accessibility ≥ 95, SEO ≥ 95, performance ≥ 85
   - Budgets live in `lighthouserc.json`

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
├── public/
│   ├── fonts/          # Self-hosted Inter (variable woff2)
│   └── robots.txt
├── src/
│   ├── pages/          # Route pages
│   │   ├── Home/
│   │   ├── About/
│   │   └── NotFound/
│   ├── components/     # Reusable components (Button example)
│   ├── types/          # Shared TypeScript types
│   ├── utils/          # Utility functions (optional)
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── app.css         # Tailwind theme + base styles
├── e2e/                # E2E tests (optional)
├── eslint-rules/       # Local ESLint rules (optional)
├── lighthouserc.json   # Lighthouse budgets (optional)
├── .github/            # GitHub Actions workflows
└── package.json
```

## Why This Stack?

- **Modern**: Latest versions of React, Vite, and Tailwind
- **Lightweight**: Minimal dependencies, fast installs and builds
- **Type-safe**: Full TypeScript support with strict checking
- **Fast**: Vite's instant HMR, route-level code splitting, self-hosted fonts
- **Accessible**: Built-in a11y linting, skip links, focus styles
- **Maintainable**: Automated formatting and linting prevent technical debt
- **CI-ready**: Workflows for checks, E2E tests, and Lighthouse budgets out of the box

## License

MIT
