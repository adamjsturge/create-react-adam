# {{PROJECT_NAME}}

A React application created with [create-react-adam](https://github.com/adamjsturge/create-react-adam).

## Getting Started

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Available Scripts

### `npm run dev`

Starts the development server with hot module replacement.

### `npm run build`

Builds the app for production. The build artifacts will be stored in the `dist/` directory.

### `npm run preview`

Previews the production build locally.

### `npm run lint` / `npm run lint:check`

Runs ESLint with auto-fix / check-only (for CI).

### `npm run format` / `npm run format:check`

Formats all files with Prettier (organizes imports, sorts Tailwind classes) / check-only (for CI).

### `npm run setFormatToPrecommitHook`

Installs a git pre-commit hook that formats and lints staged files. If this
project was scaffolded outside an existing repository, the hook was already
installed for you.

### `npm run test:e2e` (if E2E was included)

Runs Playwright E2E tests from the `e2e/` directory. `test:e2e:ui` opens
Playwright UI mode and `test:e2e:report` generates an Allure report.

### `npm run itDoesNotWork`

Runs basic troubleshooting checks: installs dependencies, checks whether the
Vite dev server is running, and prints diagnostic information.

## Project Structure

```
src/
├── pages/          # Route pages (Home, About, NotFound)
├── components/     # Reusable components
├── types/          # Shared TypeScript types
├── utils/          # Utility functions (if included)
├── App.tsx         # Routing, skip link, <main> landmark
├── main.tsx        # Entry point
└── app.css         # Tailwind theme + base styles
```

Routing uses [Wouter](https://github.com/molefrog/wouter). Pages are
code-split with `React.lazy`, and each page sets its own `document.title`.

## Adding New Pages

1. Create a new component in `src/pages/`
2. Add a lazy import and route in `src/App.tsx`

```tsx
const NewPage = lazy(() => import("./pages/NewPage"));

// In the Switch component:
<Route path="/new" component={NewPage} />;
```

## Performance, SEO, and Accessibility

- **Fonts**: Inter is self-hosted from `public/fonts/` (variable `woff2`,
  `font-display: swap`, preloaded in `index.html`). No third-party requests.
- **SEO**: `index.html` ships meta description, Open Graph, and Twitter card
  tags — update them as your app takes shape. `public/robots.txt` is included.
- **Accessibility**: a skip-to-content link, `<main>` landmark, and visible
  `:focus-visible` styles are wired into `App.tsx` / `app.css`.

## ESLint: prefer-webp-images (if included)

A local rule in `eslint-rules/prefer-webp-images.js` errors on references to
`.png`, `.jpg`, `.jpeg`, `.gif`, or `.bmp` images in imports, JSX attributes,
and string literals. Convert images to WebP at
[tools.sturge.dev/webp](https://tools.sturge.dev/webp).

For the rare image that must stay in another format:

```tsx
// eslint-disable-next-line adamjsturge/prefer-webp-images
import legacyLogo from "./legacy-logo.png";
```

## Utilities (if included)

### `classNames`

Joins class names, skipping falsy values, with clsx-style conditional objects:

```tsx
import classNames from "./utils/classNames";

classNames("btn", isActive && "btn-active", { hidden: !isOpen });
// => "btn btn-active hidden" depending on the conditions
```

### `storage` and `useReactPersist`

`localStorage` wrapper with JSON serialization and optional expiry, plus a
`useState`-compatible hook that persists across reloads:

```tsx
import storage, { useReactPersist } from "./utils/Storage";

storage.save("token", "abc123", { secondsTillExpiry: 3600 });
storage.load("token", null);

const [count, setCount] = useReactPersist("counter", 0);
```

### `useUrlState`

`useState`-compatible hook that syncs a value with a URL query parameter.
Supports string and number values (the type follows the default value):

```tsx
import { useUrlState } from "./utils/useUrlState";

const [page, setPage] = useUrlState("page", 1);
const [tab, setTab] = useUrlState("tab", "overview");
```

### `useInternetConnected`

Runs a callback when the browser is online and every time the connection
comes back:

```tsx
import { useInternetConnected } from "./utils/Internet";

useInternetConnected(() => refetch(), [refetch]);
```

### `safeTimeout`

Drop-in `setTimeout` replacement that clamps delays above the 32-bit signed
integer maximum (~24.8 days) instead of letting them overflow and fire
immediately:

```tsx
import { safeTimeout } from "./utils/helpers";

safeTimeout(() => expireSession(), thirtyDaysInMs);
```

## CI Workflows

- **Code Checks** (`.github/workflows/check.yml`): type checking, formatting,
  linting, and a production build on every push and PR to `main`.
- **E2E Tests** (`.github/workflows/e2e.yml`, if included): Playwright tests
  with report artifacts.
- **Lighthouse CI** (`.github/workflows/lighthouse.yml`, if included): audits
  the production build and fails below accessibility ≥ 95, SEO ≥ 95, and
  performance ≥ 85. Budgets live in `lighthouserc.json`.

## Dependency Management

Dependencies are pinned to exact versions and `.npmrc` sets
`save-exact=true`, so future installs stay pinned. The repo is
Renovate-friendly.

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Wouter Documentation](https://github.com/molefrog/wouter)
- [Tailwind CSS Documentation](https://tailwindcss.com)
