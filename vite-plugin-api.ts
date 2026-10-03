import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { Connect, Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage } from 'node:http';

/**
 * Dev-only middleware that serves the Vercel-style serverless handlers in
 * `api/*.js` through the Vite dev server.
 *
 * Why this is needed: a bare `vite` dev server does not know about the `api`
 * directory, so `/api/*` requests fall through to the SPA history fallback and
 * return `index.html` with a 200 — every data fetch appears to "succeed" while
 * returning the wrong content type. In production the same handlers run as real
 * serverless functions on Vercel.
 *
 * Handlers are loaded through Vite's SSR module runner, so edits are picked up
 * without restarting the dev server.
 */
export default function apiRoutes(): Plugin {
  return {
    name: 'desa-api-routes',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const apiDir = path.resolve(server.config.root, 'api');
      let routes = new Set<string>();
      try {
        routes = new Set(
          readdirSync(apiDir)
            .filter((file) => file.endsWith('.js'))
            .map((file) => file.replace(/\.js$/, '')),
        );
      } catch {
        server.config.logger.warn('[api] no api directory found — API middleware disabled');
        return;
      }

      const middleware: Connect.NextHandleFunction = async (req, res, next) => {
        const url = req.url ?? '/';
        if (!url.startsWith('/api/')) return next();

        const [pathname, search = ''] = url.split('?');
        const name = pathname.replace(/^\/api\//, '').replace(/\/+$/, '');
        if (!routes.has(name)) return next();

        try {
          const body = await readJsonBody(req);

          /* Minimal shim of the Vercel/Express request + response API. */
          const shimReq = {
            method: req.method,
            url,
            headers: req.headers,
            query: Object.fromEntries(new URLSearchParams(search)),
            body,
          };

          const shimRes = {
            status(code: number) {
              res.statusCode = code;
              return shimRes;
            },
            setHeader(key: string, value: string) {
              if (!res.headersSent) res.setHeader(key, value);
              return shimRes;
            },
            json(payload: unknown) {
              if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(payload));
              return shimRes;
            },
            send(payload: string) {
              res.end(payload);
              return shimRes;
            },
            end(payload?: string) {
              res.end(payload);
              return shimRes;
            },
          };

          const mod = await server.ssrLoadModule(`/api/${name}.js`);
          const handler = mod.default ?? mod.handler;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `api/${name}.js has no default export` }));
            return;
          }

          await handler(shimReq, shimRes);

          if (!res.writableEnded) {
            res.statusCode = 204;
            res.end();
          }
        } catch (error) {
          server.config.logger.error(`[api] /api/${name} failed: ${String(error)}`);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
          }
          if (!res.writableEnded) {
            res.end(JSON.stringify({ error: 'API handler failed', detail: String(error) }));
          }
        }
      };

      server.middlewares.use(middleware);
      server.config.logger.info(`[api] serving ${routes.size} serverless handler(s) locally: /api/*`);
    },
  };
}

/** Collects and parses a JSON request body. Returns undefined for empty bodies. */
async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return undefined;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) return undefined;

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return undefined;

  const contentType = req.headers['content-type'] ?? '';
  if (!String(contentType).includes('application/json')) return raw;

  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}
