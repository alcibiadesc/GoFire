import { get } from "svelte/store";
import { user, resetUser } from "./../stores/user.js";

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
		user.set({ uid: 1 });
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
