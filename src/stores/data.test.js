import { get } from "svelte/store";
import { data, resetData } from "./data.js";

const getID = () => {
	data.add();
	let id = get(data)[0].id;
	return id;
};

describe("data store", () => {
	beforeEach(() => {
		resetData();
	});

	test("store is an array empty", () => {
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("reset work", () => {
		data.set([1]);
		resetData();
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("add an item", () => {
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

	test("delete an item", (id = getID()) => {
		expect(id).toEqual(expect.any(String));
		data.remove(id);
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("change a value", (id = getID()) => {
		data.change(id, "title", "Esparrago");
		const result = get(data)[0];
		const expected = { title: "Esparrago" };

		expect(result).toEqual(expect.objectContaining(expected));
	});

	test("add a saving", (id = getID()) => {
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

	test("delete a saving", (id = getID()) => {
		data.saving(id, "2021-12-05", 220);
		let id_saving = get(data)[0].saving[0].id_saving;
		data.removeSaving(id, id_saving);

		const result = get(data)[0].saving;
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("calculate revenue", (id = getID()) => {
		data.saving(id, "2021-12-05", 10);
		data.saving(id, "2021-09-05", 20);

		const result = data.revenue();
		const expected = 30;

		expect(result).toBe(expected);
	});

	test("calculate balance", (array = get(data)) => {
		for (let step = 0; step < 9; step++) {
			data.add();
			let id = get(data)[step].id;
			data.change(id, "number", 6);
		}

		const result = data.balance();
		const expected = 54;

		expect(result).toBe(expected);
	});

	test("detect no savings", () => {
		for (let step = 0; step < 9; step++) {
			data.add();
			let id = get(data)[step].id;
			data.change(id, "number", step);
		}

		const result = data.detectNoSavings();
		const expected = 36;

		expect(result).toBe(expected);
	});
});
