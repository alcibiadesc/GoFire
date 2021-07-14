import {render, cleanup} from '@testing-library/svelte';
import LangSelect from './LangSelect';

describe('Atoms | LangSelect', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(LangSelect);
    component = rendered.getByText('español');
  });

  afterEach(cleanup);

  test('have spanish', () => {
    expect(component).toBeDefined();
  });

  test('have english', () => {
    component = rendered.getByText('english');
    expect(component).toBeDefined();
  });

  test('have french', () => {
    component = rendered.getByText('français');
    expect(component).toBeDefined();
  });

  test('have german', () => {
    component = rendered.getByText('deutsche');
    expect(component).toBeDefined();
  });
  test('have portuguese', () => {
    component = rendered.getByText('português');
    expect(component).toBeDefined();
  });
  test('have portuguese', () => {
    component = rendered.getByText('português');
    expect(component).toBeDefined();
  });
  test('have russian', () => {
    component = rendered.getByText('русский');
    expect(component).toBeDefined();
  });
  test('have polskie', () => {
    component = rendered.getByText('polskie');
    expect(component).toBeDefined();
  });
});
