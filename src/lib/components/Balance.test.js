import { render, cleanup } from "@testing-library/svelte";
import Balance from "./Balance.svelte";
import { user } from "./../../stores/user.js";

import { goal } from "./../../stores/goal.js";

describe("Component-Component", () => {
	let component;
	let rendered;

	afterEach(cleanup);

	beforeEach(() => {
		const prop = { balance: 104 };
		rendered = render(Balance, prop);
	});

	test("Render Input", () => {
		component = rendered.getByText("Balance");
		expect(component).toBeDefined();
	});

	test("Balance value", () => {
		component = rendered.getByText(104, { exact: false });
	});

	test("no displayName === crack", () => {
		component = rendered.getByText("Hola crack");
		expect(component).toBeDefined();
	});

	test("import displayName from store", () => {
		cleanup();
		user.set({ displayName: "Alfredo Díaz" });
		rendered = render(Balance);
		component = rendered.getByText("Hola Alfredo");
		expect(component).toBeDefined();
	});

	test("import goal from store", () => {
		cleanup();
		goal.set(198);
		rendered = render(Balance);
		component = rendered.getByText("a 198", { exact: false });
		expect(component).toBeDefined();
	});
});