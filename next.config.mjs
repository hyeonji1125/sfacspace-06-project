/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["highlight.js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
