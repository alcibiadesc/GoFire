import { writable } from "svelte/store";

import { v4 as uuidv4 } from "uuid";

let template = {
	title: "Título",
	number: 0,
	revenue: 0,
	percent: 0,
	hightlight: false,
	saving: [],
};

const createDetails = () => {
	const { subscribe, update, set } = writable([
		{
			id: "78907323-3151-4439-b9b1-6653b4cd84c1",
			title: "Criptos",
			number: 2_000,
			percent: 0,
			hightlight: false,
			saving: [],
		},
		{
			id: "78907698-3151-4439-b9b1-6653b4cd84c1",
			title: "ETF + Plan de Pensiones",
			number: 3_000,
			percent: 0,
			hightlight: false,
			saving: [],
		},
	]);

	const getArray = () => {
		let array = [];
		subscribe((n) => (array = n));
		return array;
	};

	const add = () => update((n) => [...n, { ...template, id: uuidv4() }]);
	const remove = (id) => update((n) => n.filter((ele) => ele.id !== id));
	const change = (id, key, value) => {
		let array = getArray();
		array.map((ele) => (ele.id === id ? (ele[key] = value) : ""));
		set(array);
	};

	const revenue = () => {
		let array = getArray();
		let arrayBalance = [];
		array.map((ele) =>
			ele.saving.map((m) => (arrayBalance = [...arrayBalance, m.amount]))
		);
		let result = arrayBalance.reduce((acc, crt) => acc + crt, 0);
		console.log(result);
		return result;
	};

	const balance = () => {
		let array = getArray();
		let result = array.reduce((acc, crt) => acc + crt.number, 0);
		return result;
	};

	const saving = (id, today, amount) => {
		let array = getArray();
		array.map((ele) =>
			ele.id === id ? (ele.saving = [...ele.saving, { today, amount }]) : ""
		);
		set(array);
	};

	return {
		subscribe,
		update,
		add,
		set,
		remove,
		change,
		balance,
		saving,
		revenue,
	};
};

const goal = writable(100_000);
const details = createDetails();

export { details, goal };
