import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '@/atoms/input';

describe('Input specs', () => {
  it('renders an input element', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('applies the w-full class when exist', () => {
    render(<Input className="test-class" fluid={true} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('w-full');
  });

  it('not applies the w-full class when fluid prop not exist', () => {
    render(<Input className="test-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).not.toHaveClass('w-full');
  });

  it('forwards HTML attributes', () => {
    render(<Input placeholder="Enter some text" />);
    const inputElement = screen.getByPlaceholderText('Enter some text');
    expect(inputElement).toBeInTheDocument();
  });

  it('handles the onChange event', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles error message', () => {
    render(<Input errorMessage="Error Message" />);
    const errorMessageElement = screen.queryByText('Error Message');
    expect(errorMessageElement).toBeInTheDocument();
  });
});
