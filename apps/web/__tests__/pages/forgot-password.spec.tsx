import { render, screen } from '@testing-library/react';
import ForgotPassword from '../../pages/forgot-password/index';

jest.mock('@/../../packages/ui', () => ({
  AuthPage: jest.fn(({ logoUrl, type, onSubmit }: any) => <div data-testid="authPage-template"></div>),
}));

describe('<ForgotPassword /> specs', () => {
  it('should render authPage template', () => {
    // act
    render(<ForgotPassword />);

    // assert
    expect(screen.getByTestId('authPage-template')).toBeInTheDocument();
  });
});