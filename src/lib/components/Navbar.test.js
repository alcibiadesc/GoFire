import './../../test/matchMedia.mock';
import {render} from '@testing-library/svelte';
import Navbar from './Navbar.svelte';

jest.mock('firebase/auth');

describe('Components | Navbar', () => {
  let component;

  beforeEach(() => {
    const rendered = render(Navbar);
    component = rendered.getByAltText('Avatar');
  });

  test('should render correctly', () => {
    expect(component).toBeDefined();
  });
});
