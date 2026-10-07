import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import apiRoutes from './vite-plugin-api';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* Expose VITE_* / NEXT_PUBLIC_* vars to client code as process.env.* */
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins: [react(), tailwindcss(), apiRoutes()],
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
