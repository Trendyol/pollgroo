import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popup } from '@/molecules';

describe('<Popup /> specs', () => {
  const handleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render the modal when "show" prop is true', () => {
    render(
      <Popup show={true} onClose={handleClose} title="Test Popup">
        <p>Test content</p>
      </Popup>
    );
    expect(screen.getByText('Test Popup')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should not render the modal when "show" prop is false', () => {
    render(
      <Popup show={false} onClose={handleClose} title="Test Popup">
        <p>Test content</p>
      </Popup>
    );
    expect(screen.queryByText('Test Popup')).not.toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should call onClose function when close icon is clicked', () => {
    render(
      <Popup show={true} onClose={handleClose} title="Test Popup">
        <p>Test content</p>
      </Popup>
    );
    const closeIcon = screen.getByTestId('popup-close-icon');
    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose function when clicking outside the popup', () => {
    render(
      <Popup show={true} onClose={handleClose} title="Test Popup">
        <p>Test content</p>
      </Popup>
    );
    const modalOverlay = screen.getByTestId('popup-overlay');
    fireEvent.click(modalOverlay);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call onClose function when clicking inside the popup', () => {
    render(
      <Popup show={true} onClose={handleClose} title="Test Popup">
        <button>Click me</button>
      </Popup>
    );
    const modalBody = screen.getByTestId('popup-body');
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClose).not.toHaveBeenCalled();
    fireEvent.click(modalBody);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should not show header title when it is not pass', () => {
    const { container } = render(
      <Popup show={true} onClose={handleClose}>
        <p>Test content</p>
      </Popup>
    );

    expect(container.querySelector('h4')).not.toBeInTheDocument();
  });
});
