/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships ESM; transpile it and the R3F helpers for older bundler paths.
  transpilePackages: ['three'],
};

export default nextConfig;
