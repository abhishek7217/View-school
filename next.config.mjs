

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: "./"
  }
};

export default nextConfig;
