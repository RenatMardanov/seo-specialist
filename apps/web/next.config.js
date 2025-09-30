//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {
    svgr: false,
  },
  transpilePackages: ['@seo-specialist/ui', '@seo-specialist/utils'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@seo-specialist/ui': require('path').resolve(
        __dirname,
        '../../packages/web/ui/src/index.ts'
      ),
      '@seo-specialist/utils': require('path').resolve(
        __dirname,
        '../../packages/shared/utils/src/index.ts'
      ),
    };
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
