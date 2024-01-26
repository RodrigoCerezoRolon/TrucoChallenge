import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        proxy: {
          '/api': 'http://localhost' // Puedes configurar un proxy para las solicitudes API
        },
        hmr: {
          overlay: false
        }
      }
});
