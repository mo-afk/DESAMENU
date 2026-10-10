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
     Vercel injects these into a function's process.env; locally nothing does,
     so read .env / .env.* and copy them across. They deliberately stay out of
     `define` above, which is what inlines values into the client bundle — a
     secret listed there would ship to the browser. A real environment
     variable always wins over the file. */
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), ''))) {
    if (process.env[key] === undefined) process.env[key] = value;
  }

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
