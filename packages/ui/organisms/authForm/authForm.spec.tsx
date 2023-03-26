import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthForm } from '@/organisms';

describe('<AuthForm /> specs', () => {
  it('submits form with fullname when type is "register" and fullname is filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="register" onSubmit={onSubmit} />);

    const fullnameInput = screen.getByLabelText('Full Name');
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
    );
  });

  it('should not submit form without fullname when type is "register" and fullname is not filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="register" onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('fullname is a required field')).toBeInTheDocument());
  });

  it('should not submit form without password when type is "register" and password is not filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="register" onSubmit={onSubmit} />);

    const fullnameInput = screen.getByLabelText('Full Name');
    fireEvent.change(fullnameInput, { target: { value: 'john doe' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('password is a required field')).toBeInTheDocument());
  });

  it('submits form with email when type is "login" and email is filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="login" onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'password123',
      })
    );
  });

  it('should not submit form without email when type is "login" and email is not filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="login" onSubmit={onSubmit} />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('email is a required field')).toBeInTheDocument());
  });

  it('should not submit form without password when type is "login" and password is not filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="login" onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('password is a required field')).toBeInTheDocument());
  });

  it('submits form with email when type is "forgotPassword" and email is filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="forgotPassword" onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const submitButton = screen.getByText('Recover');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
      })
    );
  });

  it('should not submit form without email when type is "forgotPassword" and email is not filled in', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="forgotPassword" onSubmit={onSubmit} />);

    const submitButton = screen.getByText('Recover');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('email is a required field')).toBeInTheDocument());
  });

  it('should trigger handleBlur when onBlur', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm type="forgotPassword" onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    await act(async () => {
      emailInput.focus();
      emailInput.blur();
    })

    await waitFor(() =>
      expect(
        screen.getByText(
          'Recover your missed password. You will take an email with instructions on how to reset your password.'
        )
      ).toBeInTheDocument()
    );
  });
});
