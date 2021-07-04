import { render, cleanup } from "@testing-library/svelte";

import Goal from "./Goal.svelte";

describe("Component-Atom | Goal", () => {
	afterEach(cleanup);

	test("Render Goal", () => {
		let rendered = render(Goal);
		let component = rendered.getByText("Objetivo logrado");
		expect(component).toBeDefined();
	});

	test("Goal achieved equal", () => {
		let rendered = render(Goal, { goal: 100, balance: 100 });
		let component = rendered.getByText("Objetivo logrado");
		expect(component).toBeDefined();
	});
	test("Goal achieved more money", () => {
		let rendered = render(Goal, { goal: 100, balance: 101 });
		let component = rendered.getByText("Objetivo logrado");
		expect(component).toBeDefined();
	});

	test("Goal NO achieve ", () => {
		let rendered = render(Goal, { goal: 100, balance: 50 });
		let component = rendered.getByText("de 100", { exact: false });

		expect(component).toBeDefined();
	});

	test("Road works", () => {
		let rendered = render(Goal, { goal: 90, balance: 30 });
		let component = rendered.getByText("a 60", { exact: false });

		expect(component).toBeDefined();
	});
});
