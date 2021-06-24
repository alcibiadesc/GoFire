import { writable } from "svelte/store";
import { db } from "./../firebase-firestore.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { uid } from "./uid.js";

let uidGoal = "";
uid.subscribe((n) => (uidGoal = n));

const STORE_PREFIX_GOAL = "goal_";
const goalLocal = localStorage.getItem(`${STORE_PREFIX_GOAL}items`);

const goal = writable(JSON.parse(goalLocal) || 0);
goal.subscribe((value) => {
	if (goalLocal !== value) {
		localStorage.setItem(`${STORE_PREFIX_GOAL}items`, JSON.stringify(value));
	}
});

const resetGoal = () => goal.set(0);

// Firebase

const docRef = doc(db, "goal", uidGoal);
const docSnap = await getDoc(docRef);

const getGoal = () => {
	if (docSnap.exists()) {
		goal.set(docSnap.data().goal);
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}
};

const setGoal = collection(db, "goal");
const refreshGoal = async (goal) => {
	await setDoc(doc(setGoal, uidGoal), { goal });
};

goal.subscribe((goal) => {
	refreshGoal(goal);
});

export { goal, resetGoal, getGoal };
