import { writable } from "svelte/store";

import { v4 as uuidv4 } from "uuid";

const createData = () => {
	const { subscribe, update, set } = writable({
		goal: 100,
		balance: 0,
		revenue: 0,
	});

	return {
		subscribe,
		set,
	};
};

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
			revenue: 2,
			percent: 0,
			hightlight: false,
			saving: [],
		},
		{
			id: "78907698-3151-4439-b9b1-6653b4cd84c1",
			title: "ETF + Plan de Pensiones",
			number: 3_000,
			revenue: 1,
			percent: 0,
			hightlight: false,
			saving: [],
		},
	]);

	const add = () => update((n) => [...n, { ...template, id: uuidv4() }]);
	const remove = (id) => update((n) => n.filter((ele) => ele.id !== id));
	const change = (id, key, value) => {
		let array;
		subscribe((n) => (array = n));
		array.map((ele) => (ele.id === id ? (ele[key] = value) : ""));
		set(array);
	};

	return {
		subscribe,
		update,
		add,
		set,
		remove,
		change,
	};
};

const data = createData();
const details = createDetails();

export { details, data };
