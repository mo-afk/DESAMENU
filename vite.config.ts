import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import apiRoutes from './vite-plugin-api';
import faviconRedirect from './vite-plugin-favicon';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* Expose VITE_* / NEXT_PUBLIC_* vars to client code as process.env.* */
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  /* Server-only vars for the `api/*` handlers (RESEND_API_KEY and friends).
     Vercel injects these into a function's process.env at deploy time;
     locally nothing does, so load every .env / .env.local / .env.[mode]
     variable and copy it onto the Node process.env before the SSR module
     runner loads any `api/*.js` handler. Values are deliberately NOT added
     to `define` above (which inlines into the client bundle) — a secret
     listed there would ship to the browser. A real environment variable on
     the host always wins over a file value. */
  const fileEnv = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(fileEnv)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
  /* Note: there is intentionally NO hardcoded fallback key here. Copy
     .env.example to .env.local and fill in RESEND_API_KEY for local dev,
     or set it on the host / Vercel for production. */

  return {
    plugins: [react(), tailwindcss(), apiRoutes(), faviconRedirect()],
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    build: {
      rollupOptions: {
        output: {
          /* Vendor libraries in their own long-lived chunks: app code and the
             English dictionary then stay small and cacheable, and a copy
             change never invalidates React. */
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    server: {
      host: true,
      /* The dev server is reached through a proxy host (e.g. *.e2b.app)
         rather than localhost. Vite rejects unknown Host headers by
         default, which breaks the preview. */
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost'],
    },
    preview: {
      host: true,
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost'],
    },
  };
});
