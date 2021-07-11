import {render, cleanup} from '@testing-library/svelte';

import Notification from './Notification';

describe('Pages | Notification', () => {
  let component;
  let rendered;
  beforeEach(() => {
    const array = {
      saving: [{today: '1996-09-11', amount: 707}],
      status: [{today: '2016-08-29', amount: 105}]};

    rendered = render(Notification, {array});
    component = rendered.getByText('Movimientos');
  });

  afterEach(cleanup);

  test('should render correctly', () => {
    expect(component).toBeDefined();
  });
});
