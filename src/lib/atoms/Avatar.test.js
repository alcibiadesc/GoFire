import {fireEvent, render, cleanup} from '@testing-library/svelte';

import Avatar from './Avatar.svelte';
describe('Atom | Avatar', () => {
  let component;
  const mockClick = jest.fn();

  beforeEach(() => {
    const rendered = render(Avatar, {onClick: mockClick});
    component = rendered.getByRole('button');
  });

  afterEach(() => {
    cleanup();
  });

  test('Render Avatar', () => {
    expect(component).toBeDefined();
  });

  test('check click works', () => {
    fireEvent.click(component);
    const result = mockClick;
    const expected = 1;
    expect(result).toHaveBeenCalledTimes(expected);
  });
  test('img text alt exist', () => {
    cleanup();
    const rendered = render(Avatar);
    const result = rendered.getByAltText('Avatar');

    expect(result).toBeDefined();
  });
});
