import { get } from "svelte/store";
import { goal, resetGoal } from "./../stores/goal.js";
import { user, resetUser } from "./../stores/user.js";

describe("Goal Store", () => {
	test("store is undefined", () => {
		const result = get(goal);
		expect(result).toBeUndefined();
	});

	test("store reset", () => {
		resetGoal();
		const result = get(goal);

		expect(result).toBe(0);
	});
});

describe("User Store", () => {
	test("store have an object", () => {
		const result = get(user);

		expect(result).toMatchObject({
			displayName: expect.any(String),
			photoURL: expect.any(String),
			email: expect.any(String),
			uid: expect.any(String),
		});
	});

	test("store reset", () => {
		resetUser();
		const result = get(user);
		expect(result).toMatchObject({
			displayName: expect.any(String),
			photoURL: expect.any(String),
			email: expect.any(String),
			uid: expect.any(String),
		});
	});
});
