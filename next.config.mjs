import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    output: 'export',
    images: { unoptimized: true },
    eslint: { dirs: ['pages', 'components'] },
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname),
            '@/components': path.resolve(__dirname, 'components'),
            '@/lib': path.resolve(__dirname, 'lib'),
            '@/features': path.resolve(__dirname, 'features'),
            '@/hooks': path.resolve(__dirname, 'hooks'),
        };
        return config;
    },
    reactStrictMode: true,
};

export default nextConfig;
