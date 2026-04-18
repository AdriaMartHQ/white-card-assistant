/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → deploy the `out/` dir to any CDN (Cloudflare Pages, etc.)
  output: "export",
  // Force trailing slashes so dir-based static hosts (CF Pages) don't choke on
  // /white-card vs /white-card/index.html routing quirks.
  trailingSlash: true,
  images: {
    // No next/image optimization in static export — render as-is.
    unoptimized: true,
  },
};

export default nextConfig;
