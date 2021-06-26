import { writable } from "svelte/store";

const goal = writable(0);

const resetGoal = () => goal.set(0);

export { goal, resetGoal };
