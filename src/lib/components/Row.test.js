import { render, cleanup } from "@testing-library/svelte";
import Row from "./Row.svelte";

describe("Component | Row", () => {
  let component;
  let rendered;

  beforeEach(() => {
    const dataRender = {
      edit: true,
      prop: {
        id: "123",
        title: "Esparrago",
        number: 100,
        hightlight: false,
        saving: [{ date: "2021-01-01", amount: 100 }],
      },
    };
    rendered = render(Row, dataRender);
    component = rendered.getByText("Esparrago");
  });

  afterEach(cleanup);

  test("should render", () => {
    expect(component).toBeDefined();
  });

  test("number is correctly formatted", () => {
    component = rendered.getByText("100,00 €");
    expect(component).toBeDefined();
  });
});
