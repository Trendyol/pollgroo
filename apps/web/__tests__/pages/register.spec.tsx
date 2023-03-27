import { render, screen } from '@testing-library/react';
import Register from '../../pages/register/index';

jest.mock('@/../../packages/ui', () => ({
  AuthPage: jest.fn(({ logoUrl, type, onSubmit }: any) => <div data-testid="authPage-template"></div>),
}));

describe('<Register /> specs', () => {
  it('should render authPage template', () => {
    // act
    render(<Register />);

    // assert
    expect(screen.getByTestId('authPage-template')).toBeInTheDocument();
  });
});