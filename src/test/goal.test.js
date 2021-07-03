import { get } from "svelte/store";
import { goal, resetGoal } from "./../stores/goal.js";

describe("Goal Store", () => {
	test("store is undefined", () => {
		const result = get(goal);
		expect(result).toBeUndefined();
	});

	test("store reset", () => {
		goal.set(1);
		resetGoal();
		const result = get(goal);

		expect(result).toBe(0);
	});
});
