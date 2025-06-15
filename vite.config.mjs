import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [svelte()],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true
  },
  
  // Configuración de construcción
  build: {
    outDir: 'build',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false
  },
  
  // Resolución de rutas
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '$lib': path.resolve(__dirname, 'src/lib')
    }
  },
  
  // Variables de entorno
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: ['chart.js', 'uuid']
  }
}); 