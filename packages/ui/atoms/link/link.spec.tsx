import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from '@/atoms/link';

describe('<Link /> specs', () => {
  it('renders a link with the correct href and text', () => {
    const href = 'https://example.com';
    const text = 'Click me!';
    render(<Link href={href}>{text}</Link>);
    const linkElement = screen.getByRole('link', { name: text });
    expect(linkElement).toHaveAttribute('href', href);
    expect(linkElement).toHaveTextContent(text);
  });

  it('applies the specified class name', () => {
    const className = 'test-class';
    render(
      <Link href="#" className={className}>
        Test
      </Link>
    );
    const linkElement = screen.getByText('Test');
    expect(linkElement).toHaveClass(className);
  });

  it('applies the specified color', () => {
    const color = 'primary';
    render(
      <Link href="#" color={color}>
        Test
      </Link>
    );
    const linkElement = screen.getByText('Test');
    expect(linkElement).toHaveClass(`text-${color}`);
  });

  it('applies the specified size', () => {
    const size = 'xxl';
    render(
      <Link href="#" size={size}>
        Test
      </Link>
    );
    const linkElement = screen.getByText('Test');
    expect(linkElement).toHaveClass(`text-5xl`);
  });
});
