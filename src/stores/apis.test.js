import { get } from "svelte/store";
import { apis, resetApis } from "./apis.js";

describe("Apis Store", () => {
	test("store is an object", () => {
		const result = get(apis);
		const expected = {};
		expect(result).toEqual(expected);
	});
	test("add a value", () => {
		apis.set({ kraken: 123 });
		const result = get(apis);
		const expected = { kraken: 123 };
		expect(result).toEqual(expected);
	});

	test("store reset", () => {
		apis.set({ kraken: 123 });
		resetApis();
		const result = get(apis);
		const expected = {};
		expect(result).toEqual(expected);
	});
});
