import './../../test/matchMedia.mock';
import {render, cleanup} from '@testing-library/svelte';
import User from './User.svelte';

jest.mock('firebase/auth');

describe('Pages | User', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(User);
    component = rendered.getByText('Click to log in');
  });

  afterEach(cleanup);

  test('Should render', () => {
    expect(component).toBeDefined();
  });

  test('option language is rendered', () => {
    component = rendered.getByText('Change your language:');
    expect(component).toBeDefined();
  });
  test('option currency is rendered', () => {
    component = rendered.getByText('Select your currency:');
    expect(component).toBeDefined();
  });
});
