import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import path from 'node:path';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
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
    },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
});
