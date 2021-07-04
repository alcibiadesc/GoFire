import { writable } from "svelte/store";

const STORE_PREFIX = "theme";

const themeLocal = localStorage.getItem(`${STORE_PREFIX}`);

const theme = writable(JSON.parse(themeLocal) || "dark");

theme.subscribe((value) => {
	if (themeLocal !== value) {
		localStorage.setItem(`${STORE_PREFIX}`, JSON.stringify(value));
	}
});
export { theme };
