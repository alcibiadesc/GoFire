import { writable } from "svelte/store";

const STORE_PREFIX_GOAL = "goal_";
const goalLocal = localStorage.getItem(`${STORE_PREFIX_GOAL}items`);

const goal = writable(JSON.parse(goalLocal) || 0);
goal.subscribe((value) => {
	if (goalLocal !== value) {
		localStorage.setItem(`${STORE_PREFIX_GOAL}items`, JSON.stringify(value));
	}
});

goal.subscribe((n) => {
	const updateBBDD = async (n) => {
		try {
			await setDoc(doc(db, "goal", uid), { goal: n });

			console.log("Document written");
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	updateBBDD(n);
});

const goalReset = goal.set(0);

export { goal, goalReset };
