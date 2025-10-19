import type { NextConfig } from "next";

const nextConfig = {
  output: "export", // enables static HTML export
  images: { unoptimized: true }, // disable Next image optimization
  basePath: "/deadlockchallenge", // your repo name here
  assetPrefix: "/deadlockchallenge/",
};

module.exports = nextConfig;

export default nextConfig;
