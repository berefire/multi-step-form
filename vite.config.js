/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({

  base: "/multi-step-form/",
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src"),
      },
    },
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}'], // keeps Vitest away from e2e/
  },
})