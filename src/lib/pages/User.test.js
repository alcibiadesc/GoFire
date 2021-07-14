import {render, cleanup} from '@testing-library/svelte';
import User from './User.svelte';

jest.mock('firebase/auth');

describe('Pages | User', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(User);
    component = rendered.getByText('Haz click para iniciar sesión');
  });

  afterEach(cleanup);

  test('Should render', () => {
    expect(component).toBeDefined();
  });
});
