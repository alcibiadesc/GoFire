import {render, cleanup} from '@testing-library/svelte';

import Goal from './Goal.svelte';

describe('Atom | Goal', () => {
  afterEach(cleanup);

  test('Render Goal', () => {
    const rendered = render(Goal);
    const component = rendered.getByText('Objetivo logrado');
    expect(component).toBeDefined();
  });

  test('Goal achieved equal', () => {
    const rendered = render(Goal, {goal: 100, balance: 100});
    const component = rendered.getByText('Objetivo logrado');
    expect(component).toBeDefined();
  });
  test('Goal achieved more money', () => {
    const rendered = render(Goal, {goal: 100, balance: 101});
    const component = rendered.getByText('Objetivo logrado');
    expect(component).toBeDefined();
  });

  test('Goal NO achieve ', () => {
    const rendered = render(Goal, {goal: 100, balance: 50});
    const component = rendered.getByText('de 100', {exact: false});

    expect(component).toBeDefined();
  });

  test('Road works', () => {
    const rendered = render(Goal, {goal: 90, balance: 30});
    const component = rendered.getByText('a 60', {exact: false});

    expect(component).toBeDefined();
  });
});
