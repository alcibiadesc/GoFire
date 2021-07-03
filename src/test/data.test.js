import { get } from "svelte/store";
import { data, resetData } from "./../stores/data.js";

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

	test("delete an item", () => {
		resetData();
		data.add();
		const id = get(data)[0].id;
		expect(id).toEqual(expect.any(String));
		data.remove(id);
		const result = get(data);
		const expected = [];
		expect(result).toEqual(expected);
	});

	test("change a value", () => {
		resetData();
		data.add();
		const id = get(data)[0].id;
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


	test("add saving", () => {
	  resetData(); 
	  data.add(); 
	  const id = get(data)[0].id;

	  const result = get(data);
	  const expected = [{}]; 

	  expect(result).toEqual(expected); 
	})
});
