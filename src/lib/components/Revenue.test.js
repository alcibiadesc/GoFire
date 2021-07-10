import { render, cleanup } from "@testing-library/svelte";
import Revenue from "./Revenue.svelte";

describe("Component | Revenue", () => {
  let rendered;
  let component;

  beforeEach(() => {
    const prop = { revenue: 52, percent: 0.53 };
    rendered = render(Revenue, prop);
  });

  afterEach(cleanup);

  test("should render correctly", () => {
    component = rendered.getByText("Beneficios");
    expect(component).toBeDefined();
  });

  test("show correctly the revenue", () => {
    component = rendered.getByText("52 €");
    expect(component).toBeDefined();
  });

  test("show correctly the percent", () => {
    component = rendered.getByText("53%");
    expect(component).toBeDefined();
  });
});
