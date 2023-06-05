import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toaster } from '@/molecules';

describe('<Toaster  show={true} /> specs', () => {
  const handleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render the toaster as success', () => {
    render(
      <Toaster show={true} text="Test content" onClose={handleClose} />
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should not render the toaster when "show" prop is false', () => {
    render(
      <Toaster show={false} text="Test content" onClose={handleClose} />
    );
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should call onClose function when close icon is clicked', () => {
    render(
      <Toaster show={true} text="Test content" onClose={handleClose} />
    );
    const closeIcon = screen.getByTestId('toaster-close-button');
    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose function when click close button', () => {
    render(
      <Toaster show={true} text="Test content" onClose={handleClose} />
    );
    const toasterCloseButton = screen.getByTestId('toaster-close-button');
    fireEvent.click(toasterCloseButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
