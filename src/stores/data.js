import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { db } from "./../firebase.js";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { user, uid } from "./user";

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
	//

	const updateBBDD = async (array) => {
		try {
			await setDoc(doc(db, "details", uid), { array });

			console.log("Document written");
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	subscribe((arr) => {
		updateBBDD(arr);
	});

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

const reset = () => {
	details.set([]);
};

export { details, reset };
