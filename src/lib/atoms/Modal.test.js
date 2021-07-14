import {render, cleanup} from '@testing-library/svelte';
import Modal from './Modal.svelte';

describe('Atoms | Modal', () => {
  let component;
  let rendered;

  beforeEach(() => {
    rendered = render(Modal);
    component = rendered.getByTestId('close-modal');
  });

  afterEach(cleanup);

  test('should render', () => {
    expect(component).toBeDefined();
  });

  test('the modal is hidden', () => {
    component = rendered.getByTestId('upper-div');
    expect(component).toHaveClass('hideModal');
  });

  test('the modal is visible', () => {
    cleanup();
    const renderProps = {hideModal: false};
    rendered = render(Modal, renderProps);
    component = rendered.getByTestId('upper-div');
    expect(component).toHaveClass('modal');
  });
});
