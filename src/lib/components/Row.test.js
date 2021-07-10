import {render, cleanup } from "@testing-library/svelte";
import Row from "./Row.svelte" 

describe("Component | Row", () => {

    let rendered; 
    let component;

    beforeEach(() => {
        cleanup();
        const renderData = {edit: true, prop: {
            id: "id",
            title: "titulo 101",
            number: 25,
            hightlight: true,
            saving: [{today: "2021-09-09", amount:15}, {today: "2021-09-10", amount:10}]
        }} 

        rendered = render(Row, renderData)
    })

    afterEach(cleanup);

    test("should render", () => {
        component = rendered.getByText("titulo 101")
        expect(component).toBeDefined();
     })

     test("saving is added correctly", () => {
        component = rendered.getByText("15,00 €")
        expect(component).toBeDefined();

     })


})