/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  profiler: true,
};

module.exports = nextConfig;
module.exports = {
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"], weight: "400" },
      },
    ],
  },
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.dummyapi.io",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};
