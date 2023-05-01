import { render, screen } from '@testing-library/react';
import { DashboardPage } from '@/templates';
import { useDashboard } from 'contexts';

jest.mock('@/layouts', () => ({
  NavigationLayout: jest.fn(({ logoUrl, subNavigationText }: any) => (
    <div data-testid="navigation-layout">
      <span>{logoUrl}</span>
      {subNavigationText}
    </div>
  )),
}));

jest.mock('contexts', () => ({
  useDashboard: jest.fn(),
}));

describe('<DashboardPage /> specs', () => {
  let mockGameCardData = [];
  beforeEach(() => {
    mockGameCardData = [
      {
        _id: '1',
        team: { name: 'Team A' },
        title: 'Game 1',
      },
      {
        _id: '2',
        team: { name: 'Team B' },
        title: 'Game 2',
      },
    ];
    (useDashboard as jest.Mock).mockReturnValue({ gameCardData: mockGameCardData });
  });
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
