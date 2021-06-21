import { writable } from "svelte/store";
import { setDoc, doc } from "firebase/firestore";

let db = "hola";
let uid = "123123213dsaf";
const STORE_PREFIX_GOAL = "goal_";
const goalLocal = localStorage.getItem(`${STORE_PREFIX_GOAL}items`);

const goal = writable(JSON.parse(goalLocal) || 0);
goal.subscribe((value) => {
	if (goalLocal !== value) {
		localStorage.setItem(`${STORE_PREFIX_GOAL}items`, JSON.stringify(value));
	}
});

const goalReset = goal.set(0);

export { goal, goalReset };
