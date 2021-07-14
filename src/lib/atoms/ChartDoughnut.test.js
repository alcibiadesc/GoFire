import {render, cleanup} from '@testing-library/svelte';
import MockDonut from '../../test/MockDonut.svelte';
import ChartDoughnut from './ChartDoughnut.svelte';

jest.mock('svelte-chartjs/src/Doughnut.svelte', () => ({
  default: MockDonut,
}));

describe('Atoms | ChartDoughnut', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(ChartDoughnut);
    component = rendered.getByTestId('donut chart');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });
});
