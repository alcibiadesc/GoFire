import { fireEvent, render } from "@testing-library/svelte";

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

	test("Render Button", () => {
		expect(component).toBeDefined();
	});

	test("Check click", () => {
		fireEvent.click(component);

		const result = mockClick;
		const expected = 1;

		expect(result).toHaveBeenCalledTimes(expected);
	});
});
