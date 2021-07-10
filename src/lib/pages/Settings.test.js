import { render, cleanup } from "@testing-library/svelte";
import Settings from "./Settings.svelte";

describe("Pages | Settings", () => {
  let component;
  let rendered;
  beforeEach(() => {
    rendered = render(Settings);
    component = rendered.getByText("Edición");
  });

  afterEach(cleanup);

  test("should render", () => {
    expect(component).toBeDefined();
  });
});
