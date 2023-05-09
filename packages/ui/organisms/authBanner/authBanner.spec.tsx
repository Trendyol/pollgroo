import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthBanner } from '@/organisms';

describe('<AuthBanner /> specs', () => {
  it('renders the logo image with the correct props', () => {
    const logoUrl = 'https://example.com/logo.png';
    render(<AuthBanner logoUrl={logoUrl} />);
    const logoElement = screen.getByRole('img', { name: 'Pollgroo' });
    expect(logoElement).toHaveAttribute('alt', 'Pollgroo');
  });

  it('renders the correct heading and text', () => {
    const logoUrl = 'https://example.com/logo.png';
    render(<AuthBanner logoUrl={logoUrl} />);
    const headingElement = screen.getByRole('heading', { name: 'Is the team indecisive? Vote it go!' });
    expect(headingElement).toHaveTextContent('Is the team indecisive? Vote it go!');
    const textElement = screen.getByText('Blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla.');
    expect(textElement).toHaveTextContent('Blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla.');
  });
});