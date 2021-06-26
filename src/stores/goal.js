import { writable } from "svelte/store";

const goal = writable();

const resetGoal = () => goal.set(0);

export { goal, resetGoal };
