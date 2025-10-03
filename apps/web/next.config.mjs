import { composePlugins, withNx } from '@nx/next';
import { withPayload } from '@payloadcms/next/withPayload';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  nx: {
    svgr: false,
  },
  // transpilePackages: ['@seo-specialist/ui', '@seo-specialist/utils'],
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@seo-specialist/ui': path.resolve(
  //       __dirname,
  //       '../../packages/web/ui/src/index.ts'
  //     ),
  //     '@seo-specialist/utils': path.resolve(
  //       __dirname,
  //       '../../packages/shared/utils/src/index.ts'
  //     ),
  //   };
  //   return config;
  // },
  experimental: {
    reactCompiler: false,
  },
};

const plugins = [withNx, withPayload];
export default composePlugins(...plugins)(nextConfig);
