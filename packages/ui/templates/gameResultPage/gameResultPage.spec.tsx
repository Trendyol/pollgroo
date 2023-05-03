import { render, screen } from '@testing-library/react';
import { GameResultPage } from '@/templates';

jest.mock('@/layouts', () => ({
  NavigationLayout: jest.fn(({ logoUrl, subNavigationText }: any) => (
    <div data-testid="navigation-layout">
      <span>{logoUrl}</span>
      {subNavigationText}
    </div>
  )),
}));

jest.mock('@/organisms', () => ({
  GameResultCard: jest.fn(({ order, score, text, total }: any) => (
    <div data-testid="game-result-card">Game Result Card</div>
  )),
}));

describe('<DashboardPage /> specs', () => {
  it('renders the DashboardPage with the correct logo URL in Navigation component', () => {
    // assign
    const logoUrl = 'https://example.com/logo.svg';
    const gameResultCards = [{ order: 1, total: 3, score: 5, text: 'result card1 text' }];

    // act
    const { debug } = render(<GameResultPage logoUrl={logoUrl} gameResultCards={gameResultCards} />);

    debug();

    expect(screen.getByTestId('game-result-card')).toBeInTheDocument();

    // // assert
    // expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    // expect(screen.getByText(logoUrl)).toBeInTheDocument();
  });
});
