import { render, screen } from '@testing-library/react';
import { DashboardPage } from '@/templates';

jest.mock('@/layouts', () => ({
  NavigationLayout: jest.fn(({ logoUrl, subNavigationText }: any) => (
    <div data-testid="navigation-layout">
      <span>{logoUrl}</span>
      {subNavigationText}
    </div>
  )),
}));

describe('<DashboardPage /> specs', () => {
  it('renders the DashboardPage with the correct logo URL in Navigation component', () => {
    // assign
    const logoUrl = 'https://example.com/logo.svg';

    // act
    render(<DashboardPage logoUrl={logoUrl} />);

    // assert
    expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    expect(screen.getByText(logoUrl)).toBeInTheDocument();
  });
});
