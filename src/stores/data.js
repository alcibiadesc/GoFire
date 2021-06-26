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
	//

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

const data = createData();

const resetData = () => {
	data.set([]);
};

export { data, resetData };
