import {render, cleanup} from '@testing-library/svelte';

import Goal from './Goal.svelte';

describe('Atom | Goal', () => {
  const byText = 'Goal reached';

  afterEach(cleanup);

  test('Render Goal', () => {
    const rendered = render(Goal);
    const component = rendered.getByText(byText);
    expect(component).toBeDefined();
  });

  test('Goal achieved equal', () => {
    const rendered = render(Goal, {goal: 100, balance: 100});
    const component = rendered.getByText(byText);
    expect(component).toBeDefined();
  });
  test('Goal achieved more money', () => {
    const rendered = render(Goal, {goal: 100, balance: 101});
    const component = rendered.getByText(byText);
    expect(component).toBeDefined();
  });

  test('Goal NO achieve ', () => {
    const rendered = render(Goal, {goal: 100, balance: 50});
    const component = rendered.getByText('of 100', {exact: false});

    expect(component).toBeDefined();
  });

  test('Road works', () => {
    const rendered = render(Goal, {goal: 90, balance: 30});
    const component = rendered.getByText('to 60', {exact: false});

    expect(component).toBeDefined();
  });
});
