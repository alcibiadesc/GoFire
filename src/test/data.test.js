import { get } from "svelte/store";
import { data, resetData } from "./../stores/data.js";

const resetAndID = () => {
	resetData();
	data.add();
	let id = get(data)[0].id;
	return id;
};

describe("data store", () => {
	test("store is an array empty", () => {
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("store is an array empty", () => {
		data.set([1]);
		resetData();
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("add an item", () => {
		resetData();
		data.add();
		const result = get(data);
		const expected = [
			{
				title: "Título",
				number: 0,
				hightlight: false,
				saving: [],
				id: expect.any(String),
			},
		];

		expect(result).toEqual(expected);
	});

	test("delete an item", (id = resetAndID()) => {
		expect(id).toEqual(expect.any(String));
		data.remove(id);
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("change a value", (id = resetAndID()) => {
		data.change(id, "title", "Esparrago");
		const result = get(data);
		const expected = [
			{
				title: "Esparrago",
				number: expect.any(Number),
				hightlight: expect.any(Boolean),
				id: expect.any(String),
				saving: expect.any(Array),
			},
		];

		expect(result).toEqual(expect.arrayContaining(expected));
	});

	test("add a saving", (id = resetAndID()) => {
		data.saving(id, "2021-12-05", 40);

		const result = get(data)[0].saving;
		const expected = [
			{
				id_saving: expect.any(String),
				today: "2021-12-05",
				amount: 40,
			},
		];

		expect(result).toEqual(expect.arrayContaining(expected));
	});

	test("calculate revenue", (id = resetAndID()) => {
		data.saving(id, "2021-12-05", 10);
		data.saving(id, "2021-12-05", 20);

		const result = data.revenue();
		const expected = 30;

		expect(result).toBe(expected);
	});

	test("calculate balance", (array = get(data)) => {
		resetData();

		for (let step = 0; step < 9; step++) {
			data.add();
			let id = get(data)[step].id;
			data.change(id, "number", 6);
		}

		const result = data.balance();
		const expected = 54;

		expect(result).toBe(expected);
	});
});
