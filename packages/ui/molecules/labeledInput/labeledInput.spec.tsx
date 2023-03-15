import { fireEvent, render, screen } from '@testing-library/react';
import { LabeledInput } from '@/molecules/labeledInput';

describe('LabeledInput', () => {
  it('renders the label', () => {
    render(<LabeledInput label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders the input', () => {
    render(<LabeledInput label="Username" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the label with the provided ID', () => {
    render(<LabeledInput label="Username" id="username-input" />);
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username-input');
  });

  it('generates an ID for the input based on the label text', () => {
    render(<LabeledInput label="Username" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username');
  });

  it('calls the onChange handler when the input value is changed', () => {
    const handleChange = jest.fn();
    render(<LabeledInput label="Username" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
