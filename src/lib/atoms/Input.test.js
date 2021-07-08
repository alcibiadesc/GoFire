import { render, cleanup } from "@testing-library/svelte";

import Input from "./Input.svelte";

describe("Component-Atom | Input", () => {
	let component;
	let rendered;

	afterEach(cleanup);

	beforeEach(() => {
		const prop = { placeholder: "10", value: "20", label: "", type: "number" };
		rendered = render(Input, prop);
		component = rendered.getByDisplayValue("20");
	});

	test("Render Input", () => {
		expect(component).toBeDefined();
	});

	test("Test placeholder input", () => {
		component = rendered.getByPlaceholderText("10");
		expect(component).toBeDefined();
	});
});
