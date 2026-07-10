import type { ComponentType } from "react";

// Route-level code splitting + preloading.
//
// This file is the single source of truth for every page's dynamic import.
// App.tsx feeds these thunks to React.lazy() for routing, and the preload
// helpers below fire the same thunks ahead of navigation. Because dynamic
// imports are deduped by module, a preloaded chunk is never downloaded
// twice — navigating just picks up the in-flight or already-cached module.
//
// Preloading happens in two layers:
//   1. Intent: <PreloadLink> (src/components/PreloadLink.tsx) calls
//      preloadRoute() on hover/focus/touch. Hover-to-click is typically
//      200-400ms — enough for a small page chunk to arrive before the click.
//   2. Idle backstop: preloadAllRoutesWhenIdle() (called once from App.tsx)
//      fetches every remaining chunk after the window `load` event, one at a
//      time during idle periods, so it never competes with first-paint
//      resources (or your Lighthouse score).
//
// HOW TO REMOVE PRELOADING:
//   1. In App.tsx: delete the preloadAllRoutesWhenIdle() effect and the
//      useDeferredValue lines, and inline the imports back into lazy(),
//      e.g. const Home = lazy(() => import("./pages/Home"));
//   2. In src/pages/: replace <PreloadLink> with wouter's <Link>.
//   3. Delete this file and src/components/PreloadLink.tsx.

type PageLoader = () => Promise<{ default: ComponentType }>;

export const routeImports: Record<string, PageLoader> = {
  "/": () => import("./pages/Home"),
  "/about": () => import("./pages/About"),
  // Not a real link target — keyed by a pseudo-path so the idle prefetcher
  // warms the 404 page too.
  "/404": () => import("./pages/NotFound"),
};

// Fires a route's import ahead of navigation. Safe to call repeatedly and
// with paths that are not in the map (external links, dynamic segments) —
// those are a no-op.
export function preloadRoute(path: string): void {
  const load = routeImports[path];
  if (!load) return;
  void (async () => {
    try {
      await load();
    } catch {
      // Preloading is opportunistic: if it fails (offline, a deploy replaced
      // the chunk), the real import on navigation will surface the error.
    }
  })();
}

let hasStartedIdlePreload = false;

// Fetches every route chunk after the page has fully loaded, one chunk at a
// time during browser idle periods. Skips entirely for users on data-saver
// or 2G connections.
export function preloadAllRoutesWhenIdle(): void {
  // React StrictMode runs effects twice in development — only start once.
  if (hasStartedIdlePreload) return;
  hasStartedIdlePreload = true;

  const { connection } = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (connection?.saveData === true) return;
  if (connection?.effectiveType?.endsWith("2g") === true) return;

  // Safari has no requestIdleCallback; a timeout is a close-enough stand-in.
  const scheduleIdle = (callback: () => void): void => {
    if (typeof globalThis.requestIdleCallback === "function") {
      globalThis.requestIdleCallback(callback);
    } else {
      globalThis.setTimeout(callback, 1500);
    }
  };

  const queue = Object.values(routeImports);
  const loadNext = async (): Promise<void> => {
    const load = queue.shift();
    if (!load) return;
    try {
      await load();
    } catch {
      // Ignore failures here for the same reason as preloadRoute.
    }
    scheduleIdle(() => void loadNext());
  };

  // Waiting for `load` keeps prefetching out of the critical path: every
  // first-paint resource is done before the first idle callback runs.
  const start = (): void => scheduleIdle(() => void loadNext());
  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
}
