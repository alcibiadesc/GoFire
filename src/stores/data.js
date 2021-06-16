import { writable } from "svelte/store";

export const data = writable({
	goal: 100_000,
	balance: 82_000,
});

export const details = writable([
	{
		id: "fc094e9f-73e8-41a5-814a-7968f624bb08",
		title: "Rentabilidad Total",
		number: 1_000,
		percent: 0,
		hightlight: true,
	},
	{ title: "Criptos", number: 2_000, percent: 0, hightlight: false },
	{
		id: "78907698-3151-4439-b9b1-6653b4cd84c1",
		title: "ETF + Plan de Pensiones",
		number: 3_000,
		percent: 0,
		hightlight: false,
	},
]);
