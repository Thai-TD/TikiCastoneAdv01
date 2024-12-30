/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false, //thaitd change true
  logging: {
    fetches: {
      failed: true,
    },
  },
};

export default nextConfig;
