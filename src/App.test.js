import {render, cleanup} from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(App);
    component = rendered.getByText('Balance');
  });

  afterEach(cleanup);

  test('test should render', () => {
    expect(component).toBeDefined();
  });
});
