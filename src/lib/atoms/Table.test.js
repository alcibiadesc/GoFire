import {render, cleanup} from '@testing-library/svelte';
import Table from './Table.svelte';

describe('Atoms | Table', () => {
  let component;
  let rendered;

  beforeEach(() => {
    const renderProps = {
      savings: [
        {today: '1988-08-23', amount: 300},
        {today: '1988-08-24', amount: 400},
        {today: '1988-08-25', amount: 500},
      ]};
    rendered = render(Table, renderProps);
    component = rendered.getByText('FECHA');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });

  test('render table', () => {
    component = rendered.getByText('1988-08-24');
    expect(component).toBeDefined();
  });
});
