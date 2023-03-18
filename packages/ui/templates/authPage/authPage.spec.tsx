import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthPage } from '@/templates';

describe('<AuthPage /> specs', () => {
  const mockOnSubmit = jest.fn();

  it('renders correctly with login type', () => {
    const logoUrl = 'https://example.com/logo.png';
    const type = 'login';
    render(<AuthPage logoUrl={logoUrl} type={type} onSubmit={mockOnSubmit} />);

    expect(screen.getByAltText('Pollgroo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /is the team indecisive\? vote it go!/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onSubmit function with form values when submitted', async () => {
    const logoUrl = 'https://example.com/logo.png';
    const type = 'register';
    render(<AuthPage logoUrl={logoUrl} type={type} onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const fullnameInput = screen.getByLabelText('Full Name');
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(fullnameInput, { target: { value: 'Test User' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullname: 'Test User',
        email: 'test@test.com',
        password: 'password123',
      })
    );
  });
});
