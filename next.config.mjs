

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["mongoose"], // Retaining this experimental option
    },
    images: {
      domains: ['lh3.googleusercontent.com'], // Specifying allowed image domains
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // Enabling top-level await in Webpack
      };
      return config;
    },
  };
  
  export default nextConfig;
  