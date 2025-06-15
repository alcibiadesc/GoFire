import App from "./App.svelte";
import "./styles/Tailwind.css";

var app = new App({
	target: document.body,
});

export default app;

if (import.meta.hot) {
	// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
	// Learn more: https://vitejs.dev/guide/features.html#hot-module-replacement
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		app.$destroy();
	});
}

//Type override for Import/env so TS doesn't complain
declare global {
	interface ImportMeta {
		hot?: {
			accept: () => void;
			dispose: (cb: () => void) => void;
		};
		env: {
			MODE: string;
			VITE_API_URL: string;
			DEV: boolean;
			PROD: boolean;
		};
	}
}
