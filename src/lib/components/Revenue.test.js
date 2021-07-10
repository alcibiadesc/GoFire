import { render, cleanup } from "@testing-library/svelte";

import Revenue from "./Revenue.svelte";

describe("Component | Revenue", () => {
    let component;
    let rendered;

    beforeEach(() => {
        const prop = { revenue: 52, percent: 0.53 }
        rendered = render(Revenue, prop);
        component = rendered.getByText("Beneficios");
    });

    afterEach(cleanup);

    test("should render correctly", () => {
        expect(component).toBeDefined();
    });


    test("show correctly the revenue", () => {
        component = rendered.getByText("52 €");
        expect(component).toBeDefined();
    })

    test("show correctly the percent", () => {
        component = rendered.getByText("53%");
        expect(component).toBeDefined();
    })

})