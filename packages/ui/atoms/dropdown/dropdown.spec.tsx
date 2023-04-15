import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dropdown } from '../dropdown';

describe('<Dropdown />', () => {
  const options = [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
  ];

  it('renders options', () => {
    const { getByText } = render(<Dropdown options={options} />);
    options.forEach((option) => {
      expect(getByText(option.value)).toBeInTheDocument();
    });
  });

  it('calls onChange function', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Dropdown options={options} onChange={onChange} />);
    fireEvent.change(getByRole('combobox'), { target: { value: 'Option 2' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(<Dropdown options={options} error errorMessage={errorMessage} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
