import { render, screen } from '@testing-library/react';
import { DashboardPage } from '@/templates';

jest.mock('@/organisms/navigation', () => ({
  Navigation: jest.fn(({ logoUrl }: any) => <div data-testid="navigation-organism">{logoUrl}</div>),
}));

describe('<DashboardPage /> specs', () => {
  it('renders the DashboardPage with the correct logo URL in Navigation component', () => {
    // assign
    const logoUrl = 'https://example.com/logo.svg';

    // act
    render(<DashboardPage logoUrl={logoUrl} />);

    // assert
    expect(screen.getByTestId('navigation-organism')).toBeInTheDocument();
    expect(screen.getByText(logoUrl)).toBeInTheDocument();
  });
});
