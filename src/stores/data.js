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

const createData = () => {
	const { subscribe, update, set } = writable([]);

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

		return result;
	};

	const saving = (id, today, amount) => {
		let array = getArray();
		let id_saving = uuidv4();
		array.map((ele) =>
			ele.id === id
				? (ele.saving = [...ele.saving, { id_saving, today, amount }])
				: ""
		);
		set(array);
	};

	const balance = () => {
		let array = getArray();
		let result = array.reduce((acc, crt) => acc + crt.number, 0);
		return result;
	};

	const detectNoSavings = () => {
		let array = getArray();
		let arrayMerge = [];

		array.map((ele) =>
			ele.saving.length === 0 ? (arrayMerge = [...arrayMerge, ele.number]) : ""
		);

		let result = arrayMerge.reduce((acc, crt) => acc + crt, 0);
		return result;
	};

	const removeSaving = (id, id_saving) => {
		let array = getArray();
		let thisArray = array.filter((m) => m.id === id);
		let newArr = thisArray[0].saving.filter((x) => x.id_saving != id_saving);

		update((ele) =>
			ele.map((n) => (n.id == id ? { ...n, saving: newArr } : n))
		);
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
		detectNoSavings,
		removeSaving,
	};
};

const data = createData();

const resetData = () => {
	data.set([]);
};

export { data, resetData };
