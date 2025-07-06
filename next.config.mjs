/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com',
              'res.cloudinary.com'
    ], // Add this line
    
    remotePatterns: [
      {
    protocol: "http",
    hostname: "res.cloudinary.com",
    pathname: "/dsbtbynum/**",
  },
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/dsbtbynum/**",
  },
    ],
  },
};

export default nextConfig;
