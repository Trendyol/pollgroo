import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/molecules';

describe('<Modal /> specs', () => {
  const handleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render the modal when "show" prop is true', () => {
    render(
      <Modal show={true} onClose={handleClose} title="Test Modal">
        <p>Test content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should not render the modal when "show" prop is false', () => {
    render(
      <Modal show={false} onClose={handleClose} title="Test Modal">
        <p>Test content</p>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should call onClose function when close icon is clicked', () => {
    render(
      <Modal show={true} onClose={handleClose} title="Test Modal">
        <p>Test content</p>
      </Modal>
    );
    const closeIcon = screen.getByTestId('modal-close-icon');
    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose function when clicking outside the modal', () => {
    render(
      <Modal show={true} onClose={handleClose} title="Test Modal">
        <p>Test content</p>
      </Modal>
    );
    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call onClose function when clicking inside the modal', () => {
    render(
      <Modal show={true} onClose={handleClose} title="Test Modal">
        <button>Click me</button>
      </Modal>
    );
    const modalBody = screen.getByTestId('modal-body');
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClose).not.toHaveBeenCalled();
    fireEvent.click(modalBody);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
