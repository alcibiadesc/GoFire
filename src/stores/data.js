import { writable } from "svelte/store";

export const data = writable({
	goal: 100_000,
	balance: 82_000,
});
