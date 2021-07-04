import { writable } from "svelte/store";

const STORE_PREFIX = "theme";

const themeLocal = localStorage.getItem(`${STORE_PREFIX}`);

const systemTheme = () => {
	const checkDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return checkDark ? "dark" : "light";
};

const theme = writable(JSON.parse(themeLocal) || systemTheme());

theme.subscribe((value) => {
	if (themeLocal !== value) {
		localStorage.setItem(`${STORE_PREFIX}`, JSON.stringify(value));
	}
});
export { theme };
