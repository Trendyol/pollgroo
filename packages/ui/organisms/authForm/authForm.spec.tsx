import { render } from '@testing-library/react';
import { AuthForm } from '@/organisms';

describe('AuthForm component', () => {
  it('renders correctly with login type', () => {
    const { getByLabelText, getByText } = render(<AuthForm type="login" />);
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders correctly with register type', () => {
    const { getByLabelText, getByText } = render(<AuthForm type="register" />);
    expect(getByText('Register')).toBeInTheDocument();
    expect(getByLabelText('Full Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders correctly with forgot password type', () => {
    const { getByLabelText, getByText } = render(<AuthForm type="forgotPassword" />);
    expect(getByText('Recover')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
  });

});
