import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The dev server is reached through a proxy host (e.g. *.e2b.app) rather
   * than localhost. Next.js blocks cross-origin requests to its dev-only
   * resources (HMR socket, font metric files) by default, which silently
   * prevents the client bundle from hydrating — the page renders but every
   * client component stays inert.
   *
   * This only affects `next dev`; production builds have no dev resources.
   */
  allowedDevOrigins: [
    "*.e2b.app",
    "*.arena.ai",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
};

export default nextConfig;
