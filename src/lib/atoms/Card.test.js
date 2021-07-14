import {render, cleanup} from '@testing-library/svelte';
import Card from './Card.svelte';

describe('Atoms | Card', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(Card);
    component = rendered.getByTestId('card-rendered');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
