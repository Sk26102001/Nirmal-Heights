/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["gsap", "@gsap/react"],
  reactStrictMode: false, // Helps avoid double GSAP animation triggers during strict mode in dev
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
