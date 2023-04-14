import React from 'react';
import { render, screen } from '@testing-library/react';
import { LabeledDropdown } from '@/molecules';
import { Dropdown } from '@/atoms';

jest.mock('../../atoms/Dropdown', () => ({
  Dropdown: jest.fn().mockReturnValue(<div data-testid="mock-dropdown" />),
}));

describe('LabeledDropdown', () => {
  const options = [
    { value: 'option-1', id: 'Option 1' },
    { value: 'option-2', id: 'Option 2' },
    { value: 'option-3', id: 'Option 3' },
  ];

  it('should render the label and the Dropdown component', () => {
    render(<LabeledDropdown label="Test Label" options={options} />);
    const labelElement = screen.getByText('Test Label');
    const dropdownElement = screen.getByTestId('mock-dropdown');
    expect(labelElement).toBeInTheDocument();
    expect(dropdownElement).toBeInTheDocument();
  });

  it('should pass the props to the Dropdown component', () => {
    render(<LabeledDropdown label="Test Label" options={options} disabled />);
    expect(Dropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        options,
        disabled: true,
      }),
      {}
    );
  });
  it('should add error class name when error prop is true', () => {
    const { container } = render(<LabeledDropdown label="Test Label" options={options} error />);
    expect(container.querySelector('.text-red')).toBeInTheDocument();
  });
});
