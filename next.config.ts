import type { NextConfig } from "next";

// Static export: `npm run build` writes a fully pre-rendered site to /out
// that can be hosted anywhere (Vercel, Netlify, GitHub Pages, cPanel).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
