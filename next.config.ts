const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/deadlockchallenge" : "",
  assetPrefix: isProd ? "/deadlockchallenge/" : "",
};

module.exports = nextConfig;
