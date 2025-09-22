/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // TODO: fix for real build
    ignoreBuildErrors: true,
  },
  rewrites() {
    return [
      // Proxy to mockoon's or BFF's URL
      {
        source: '/api/:path*',
        destination:
          (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/') +
          '/api/:path*',
      },
    ];
  },
  webpack(config) {
    /**
     * Хак для трансформации kebab-case в css-модулях в camelCase.
     */
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options.modules) {
          options.modules.exportLocalsConvention = 'camelCase';
        }
      });

    return config;
  },
};

export default nextConfig;
