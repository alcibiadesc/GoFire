import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { db } from "./../firebase.js";

// Test

// User Profile

const STORE_PREFIX_USER = "user_";
const userProfile = localStorage.getItem(`${STORE_PREFIX_USER}items`);

const user = writable(
	JSON.parse(userProfile) || {
		name: "",
		img: "icons/user.svg",
		uid: "",
		email: "",
	}
);

user.subscribe((value) => {
	if (userProfile !== value) {
		localStorage.setItem(`${STORE_PREFIX_USER}items`, JSON.stringify(value));
	}
});

// Data
let template = {
	title: "Título",
	number: 0,
	revenue: 0,
	percent: 0,
	hightlight: false,
	saving: [],
};

const STORE_PREFIX_DETAILS = "details_";
const detailsItems = localStorage.getItem(`${STORE_PREFIX_DETAILS}items`);

const createDetails = () => {
	const { subscribe, update, set } = writable(JSON.parse(detailsItems) || []);

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

const details = createDetails();

details.subscribe((value) => {
	if (detailsItems !== value) {
		localStorage.setItem(`${STORE_PREFIX_DETAILS}items`, JSON.stringify(value));
	}
});

const goal = writable(100_000);

const reset = () => {
	user.set({ name: "Crack", img: "icons/user.svg" });
	details.set([]);
};

export { details, goal, user, reset };
