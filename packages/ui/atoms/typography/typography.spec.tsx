import { render } from '@testing-library/react';
import { Typography } from "./typography";
import { TextSize, TextColor } from './enums';

describe('Typography', () => {
  it('renders with the base size and default color by default', () => {
    const { container } = render(<Typography element="div">Hello, world!</Typography>);
    expect(container.firstChild).toHaveClass(TextSize.base);
  });

  it('renders with the provided size and color', () => {
    const { container } = render(<Typography element="div" size="xxxl" color="primary">Hello, world!</Typography>);
    expect(container.firstChild).toHaveClass(TextSize.xxxl);
    expect(container.firstChild).toHaveClass(TextColor.primary);
  });

  it('renders the provided element type', () => {
    const { container } = render(<Typography element="h1">Hello, world!</Typography>);
    expect((container.firstChild as any).tagName).toBe('H1');
  });

  it('renders the provided children', () => {
    const { getByText } = render(<Typography element="div">Hello, world!</Typography>);
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });

  it('applies additional classes', () => {
    const { container } = render(<Typography element="div" className="custom-class">Hello, world!</Typography>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies additional props', () => {
    const { container } = render(<Typography element="div" data-testid="typography">Hello, world!</Typography>);
    expect(container.firstChild).toHaveAttribute('data-testid', 'typography');
  });
});