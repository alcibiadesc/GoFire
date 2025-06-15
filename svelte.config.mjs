import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
	
	compilerOptions: {
		// Habilitar runtime checks en desarrollo
		dev: process.env.NODE_ENV === 'development'
	},
	
	// Configuración adicional para Vite
	onwarn: (warning, handler) => {
		// Silenciar advertencias específicas si es necesario
		if (warning.code === 'css-unused-selector') return;
		handler(warning);
	}
};
