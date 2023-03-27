import { render, screen } from '@testing-library/react';
import Login from '../../pages/login/index';

jest.mock('@/../../packages/ui', () => ({
  AuthPage: jest.fn(({ logoUrl, type, onSubmit }: any) => <div data-testid="authPage-template"></div>),
}));

describe('<Login /> specs', () => {
  it('should render authPage template', () => {
    // act
    render(<Login />);

    // assert
    expect(screen.getByTestId('authPage-template')).toBeInTheDocument();
  });
});
