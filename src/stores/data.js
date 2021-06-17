import { writable } from "svelte/store";

export const data = writable({
	goal: 100_000,
	balance: 82_000,
});

export const details = writable([
	{
		title: "Criptos",
		number: 2_000,
		revenue: 2,
		percent: 0,
		hightlight: false,
	},
	{
		id: "78907698-3151-4439-b9b1-6653b4cd84c1",
		title: "ETF + Plan de Pensiones",
		number: 3_000,
		revenue: 1,
		percent: 0,
		hightlight: false,
	},
]);
