import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// PWA support (optional create-react-adam feature). vite-plugin-pwa makes
// the app installable and offline-capable: `npm run build` generates a
// service worker (dist/sw.js) that precaches the app shell, emits a web app
// manifest (dist/manifest.webmanifest), and injects the registration script
// into index.html. `npm run dev` is unaffected — the service worker only
// exists in production builds; test it locally with
// `npm run build && npm run preview`. Docs: https://vite-pwa-org.netlify.app
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // New deployments take over automatically on the user's next visit —
      // no "refresh to update" prompt, no stale app shell.
      registerType: "autoUpdate",
      workbox: {
        // Precache all built JS/CSS/HTML plus SVGs and the self-hosted
        // fonts, so the entire app shell works offline after the first
        // visit. Add extensions here if you ship other static assets
        // (e.g. png, webp) that should be available offline.
        globPatterns: ["**/*.{js,css,html,svg,woff2}"],
        // SPA fallback: deep links like /about are client-side routes, so
        // the service worker answers them with the cached index.html when
        // offline instead of failing with a network error.
        navigateFallback: "index.html",
      },
      // The install metadata browsers read for "Install app" / "Add to
      // Home Screen": the installed app's name, icon, and window colors.
      manifest: {
        name: "__PROJECT_NAME__",
        short_name: "__PROJECT_NAME__",
        description: "A React app built with create-react-adam",
        // Keep in sync with the theme-color <meta> tag in index.html.
        theme_color: "#2563eb",
        // Splash-screen background while the app loads; matches
        // --color-brand-background in src/app.css.
        background_color: "#f8fafc",
        display: "standalone",
        icons: [
          {
            // SVG icons scale to any size; swap in 192x192 and 512x512
            // PNGs here if you need to support older devices.
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});
