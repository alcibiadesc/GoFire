import { get } from "svelte/store";
import { goal, resetGoal } from "./goal.js";

describe("Goal Store", () => {
	test("store is undefined", () => {
		const result = get(goal);
		expect(result).toBeUndefined();
	});

	test("add a value", () => {
		goal.set(89);
		const result = get(goal);
		const expected = 89;
		expect(result).toBe(expected);
	});

	test("store reset", () => {
		goal.set(12312);
		resetGoal();
		const result = get(goal);
		expect(result).toBeUndefined();
	});
});
