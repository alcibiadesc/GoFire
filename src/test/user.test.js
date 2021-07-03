import { get } from "svelte/store";
import { user, resetUser } from "./../stores/user.js";

describe("User Store", () => {
	test("store have an object", () => {
		const result = get(user);
		const expected = {
			displayName: expect.any(String),
			photoURL: expect.any(String),
			email: expect.any(String),
			uid: expect.any(String),
		};

		expect(result).toMatchObject(expected);
	});

	test("store reset", () => {
		user.set({ uid: 1123 });
		resetUser();
		const result = get(user);
		const expected = {
			displayName: expect.any(String),
			photoURL: expect.any(String),
			email: expect.any(String),
			uid: expect.any(String),
		};
		expect(result).toMatchObject(expected);
	});
});
