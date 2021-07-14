import './../../test/matchMedia.mock';
import {render, cleanup} from '@testing-library/svelte';
import Navbar from './Navbar.svelte';

jest.mock('firebase/auth');

describe('Components | Navbar', () => {
  let component;

  beforeEach(() => {
    const rendered = render(Navbar);
    component = rendered.getByAltText('Avatar');
  });

  afterEach(cleanup);

  test('should render correctly', () => {
    expect(component).toBeDefined();
  });
});
