import {render, cleanup} from '@testing-library/svelte';

import Home from './Home';

describe('Pages | Home', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(Home);
    component = rendered.getByText('Hola crack');
  });

  afterEach(cleanup);

  test('should render correctly', () => {
    expect(component).toBeDefined();
  });
});
