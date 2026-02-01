/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows all hostnames
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
