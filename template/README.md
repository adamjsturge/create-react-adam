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
├── components/     # Reusable components (Button, PreloadLink)
├── types/          # Shared TypeScript types
├── utils/          # Utility functions (if included)
├── App.tsx         # Routing, skip link, <main> landmark
├── routes.ts       # Route import map + preload helpers
├── main.tsx        # Entry point
└── app.css         # Tailwind theme + base styles
```

Routing uses [Wouter](https://github.com/molefrog/wouter). Pages are
code-split with `React.lazy`, and each page sets its own `document.title`.

## Adding New Pages

1. Create a new component in `src/pages/`
2. Add its import thunk to `src/routes.ts` (this both registers it for
   preloading and gives `App.tsx` its lazy import)
3. Add a lazy component and route in `src/App.tsx`

```tsx
// src/routes.ts
export const routeImports: Record<string, PageLoader> = {
  // ...
  "/new": () => import("./pages/NewPage"),
};

// src/App.tsx
const NewPage = lazy(routeImports["/new"]);

// In the Switch component:
<Route path="/new" component={NewPage} />;
```

4. Link to it with `<PreloadLink href="/new">` so the chunk preloads on
   hover/focus/touch (wouter's plain `<Link>` works too, just without the
   preload).

## Route Preloading

Pages are lazy-loaded, so without preloading every navigation waits for a
network round trip. The template closes that gap in three layers:

1. **One import map** (`src/routes.ts`): the router and the preloaders share
   the same import thunks, and dynamic imports dedupe by module — so a
   preloaded chunk is never downloaded twice.
2. **Preload on intent** (`src/components/PreloadLink.tsx`): links fire the
   target page's import on hover, focus, or touch. Hover-to-click is
   typically 200-400ms — usually enough for the chunk to arrive first.
3. **Idle backstop** (`preloadAllRoutesWhenIdle` in `src/routes.ts`, called
   from `App.tsx`): after the window `load` event, remaining chunks are
   fetched one at a time during idle periods. It never competes with
   first-paint resources (so Lighthouse is unaffected) and skips users on
   data-saver or 2G connections.

`App.tsx` also routes against a `useDeferredValue`-deferred location, so the
previous page stays painted until the next page is ready instead of flashing
the blank `Suspense` fallback. Preloading makes navigation fast; the deferred
location makes it smooth.

**To remove preloading**, follow the steps in the header comment of
`src/routes.ts` — in short: inline the imports back into `lazy()` in
`App.tsx`, swap `<PreloadLink>` back to wouter's `<Link>`, and delete
`src/routes.ts` and `src/components/PreloadLink.tsx`.

## Performance, SEO, and Accessibility

- **Fonts**: Inter is self-hosted from `public/fonts/` (variable `woff2`,
  `font-display: swap`, preloaded in `index.html`). No third-party requests.
- **SEO**: `index.html` ships meta description, Open Graph, and Twitter card
  tags — update them as your app takes shape. `public/robots.txt` and an SVG
  favicon (`public/favicon.svg`) are included.
- **Accessibility**: a skip-to-content link, `<main>` landmark, and visible
  `:focus-visible` styles are wired into `App.tsx` / `app.css`.

## PWA (if included)

This app is a Progressive Web App: browsers offer an "Install" option, and
the app keeps working offline after the first visit.

- Everything is configured in `vite.config.ts` via
  [vite-plugin-pwa](https://vite-pwa-org.netlify.app) — the web app manifest
  (name, colors, icon) lives there too. Update it alongside the matching
  values in `index.html` (`theme-color`) and `public/favicon.svg`.
- `npm run build` generates the service worker (`dist/sw.js`) and manifest
  (`dist/manifest.webmanifest`) and injects the registration script into
  `index.html` — no client code to maintain.
- The service worker precaches the app shell (JS, CSS, HTML, SVG, fonts) and
  answers client-side routes with the cached `index.html` when offline.
- Updates are automatic (`registerType: "autoUpdate"`): a new deployment
  replaces the old service worker on the user's next visit.
- Dev mode is unaffected — the service worker only exists in production
  builds. Test it locally with `npm run build && npm run preview`.

To remove PWA support later: delete the `VitePWA(...)` block and its import
from `vite.config.ts`, then run `npm uninstall vite-plugin-pwa`.

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
