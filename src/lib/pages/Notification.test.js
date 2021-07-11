import {render, cleanup} from '@testing-library/svelte';

import Notification from './Notification';

describe('Pages | Notification', () => {
  let component;
  let rendered;
  beforeEach(() => {
    rendered = render(Notification);
    component = rendered.getByText('Movimientos');
  });

  afterEach(cleanup);

  test('should render correctly', () => {
    expect(component).toBeDefined();
  });
});
