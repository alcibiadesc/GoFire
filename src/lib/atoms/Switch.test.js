import './../../test/matchMedia.mock';
import {render, cleanup} from '@testing-library/svelte';
import Switch from './Switch.svelte';
describe('Atoms | Switch', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(Switch);
    component = rendered.getByTestId('input');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
