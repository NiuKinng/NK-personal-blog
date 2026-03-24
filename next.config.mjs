/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/NK-personal-blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
