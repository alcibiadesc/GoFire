import {render, cleanup} from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';

describe('Atoms | Tooltip', () => {
  let component;
  let rendered;

  beforeEach(() => {
    const renderProps = {label: 'test the label'};
    rendered = render(Tooltip, renderProps);
    component = rendered.getByText('test the label');
  });

  afterEach(cleanup);

  test('should render with the correct tooltip', () => {
    expect(component).toBeDefined();
  });
});
