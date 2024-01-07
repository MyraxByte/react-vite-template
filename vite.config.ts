import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            million.vite({ auto: true }),
            react(),
            checker({
                typescript: true,
                overlay: true,
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
                },
            }),
        ],
        base: './',
        server: {
            port: 8080,
            proxy: {
                '/api': {
                    target: env.VITE_APP_BACKEND_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        },
    };
});
