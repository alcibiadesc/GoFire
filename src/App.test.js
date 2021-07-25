import './test/matchMedia.mock';
import {render, cleanup} from '@testing-library/svelte';
import MockDonut from './test/MockDonut.svelte';
import App from './App.svelte';

jest.mock('firebase/auth');
jest.mock('svelte-chartjs/src/Doughnut.svelte', () => ({
  default: MockDonut,
}));

describe('App', ()=> {
  let component;
  let rendered;

  beforeEach( ()=> {
    rendered = render(App);
    component = rendered.getByText('Try it for Free');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
