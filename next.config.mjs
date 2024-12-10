/** @type {import('next').NextConfig} */



const imagesConfig = {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'wiplyplatform.fra1.cdn.digitaloceanspaces.com',
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
        pathname:
          '/shulgirit/image/upload/v1709044694/wiply-platform/user-uploads/**',
      },
      {
        protocol: "https",
        hostname: 'wiplyplatform.fra1.cdn.digitaloceanspaces.com',
      },
    ],
  };



const nextConfig = {
      /* config options here */
  images: imagesConfig,
  reactStrictMode: false,

};



export default nextConfig;
