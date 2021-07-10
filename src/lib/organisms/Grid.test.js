import { render, cleanup } from "@testing-library/svelte";
import Grid from "./Grid.svelte";
import { data } from "./../../stores/data.js";

describe("Organisms | Grid", () => {
  let component;
  let rendered;

  beforeEach(() => {
    data.add();
    rendered = render(Grid);
  });

  afterEach(cleanup);

  test("should render", () => {
    component = rendered.getAllByText("Título");
    expect(component).toBeDefined();
  });
});
