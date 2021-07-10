import { render, cleanup } from "@testing-library/svelte";
import Apis from "./Apis.svelte";

describe("Organisms | Apis", () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(Apis);
    component = rendered.getByText("Conecta tus plataformas");
  });
  afterEach(cleanup);

  test("should render", () => {
    expect(component).toBeDefined();
  });

  test("add an input", () => {
    const component = rendered.getByText("kraken");
    expect(component).toBeDefined();
  });
});
