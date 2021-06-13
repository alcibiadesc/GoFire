import { writable } from "svelte/store";

export const data = writable({
	goal: 1,
	balance: 2,
});
