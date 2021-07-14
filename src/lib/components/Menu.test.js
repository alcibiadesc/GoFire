import {render, cleanup} from '@testing-library/svelte';
import Menu from './Menu';

describe('Components | Menu', () => {
  let component;
  let rendered;

  beforeEach(async () => {
    rendered = render(Menu);
    component = rendered.getByTestId('menu');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
