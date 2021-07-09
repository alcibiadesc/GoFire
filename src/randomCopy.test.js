import { randomCopy } from "./randomCopy.js";

describe("Random Copy generator", () => {
	test("Take a string", () => {
		const result = randomCopy();
		const expected = expect.any(String);

		expect(result).toEqual(expected);
	});

	test("Is a diferent copy", () => {
		const result_one = randomCopy();
		const result_two = randomCopy();
		const result_three = randomCopy();
		const result_four = randomCopy();

		const result = ((result_one == result_two) == result_three) == result_four;
		const expected = false;

		expect(result).toBe(expected);
	});
});
