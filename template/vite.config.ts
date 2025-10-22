// eslint-disable-next-line import/no-unresolved
import tailwindcss from "@tailwindcss/vite";
// eslint-disable-next-line import/no-unresolved
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
