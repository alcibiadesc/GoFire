import { fireEvent, render, cleanup } from "@testing-library/svelte";

import Button from "./Button.svelte";

describe("Button", () => {
	let component;
	const mockClick = jest.fn();

	beforeEach(() => {
		const prop = {
			icon: "menu",
			style: "primary",
			onClick: mockClick,
		};
		let componentRendered = render(Button, { prop });
		component = componentRendered.getByRole("button");
	});

	afterEach(() => {
		cleanup();
	});

	test("Render Button", () => {
		expect(component).toBeDefined();
	});

	test("check click works", () => {
		fireEvent.click(component);

		const result = mockClick;
		const expected = 1;

		expect(result).toHaveBeenCalledTimes(expected);
	});

	test("img text alt exist", () => {
		cleanup();
		let componentRendered = render(Button, { prop: { icon: "goal" } });
		let result = componentRendered.getByAltText("goal");

		expect(result).toBeDefined();
	});
});
