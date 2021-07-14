import './test/matchMedia.mock';
import {render, cleanup} from '@testing-library/svelte';
import App from './App.svelte';

jest.mock('firebase/auth');

describe('App', ()=> {
  let component;
  let rendered;

  beforeEach( ()=> {
    rendered = render(App);
    component = rendered.getByText('Balance');
  });

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
