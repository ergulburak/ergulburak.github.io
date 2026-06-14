import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — required for GitHub Pages hosting.
  output: "export",
  // GitHub Pages serves directory index.html; trailing slashes make
  // extensionless routes (e.g. /blog/post) resolve reliably.
  trailingSlash: true,
  // next/image isn't used, but keep export safe if it's added later.
  images: { unoptimized: true },
};

export default nextConfig;
