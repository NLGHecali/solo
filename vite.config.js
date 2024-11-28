import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Porta do servidor Vite
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Proxy para a API do backend
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
