import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GamesPage } from '../../templates';
import * as GameContext from 'contexts/gameContext';

jest.mock('@/layouts', () => ({
  NavigationLayout: jest.fn(({ children }) => <div data-testid="navigation-layout">{children}</div>),
}));

jest.mock('@/organisms', () => ({
  CreateGameModal: jest.fn(() => <div data-testid="create-game-modal" />),
  GameCard: jest.fn(() => <div data-testid="game-card" />),
}));

describe('<GamesPage /> specs', () => {
  let gameCardData: any;
  let setShowCreateGameModalSpy: jest.Mock;
  beforeEach(() => {
    setShowCreateGameModalSpy = jest.fn();
    gameCardData = [
      { _id: '1', team: { name: 'Team A' }, title: 'Game 1' },
      { _id: '2', team: { name: 'Team B' }, title: 'Game 2' },
      { _id: '3', team: { name: 'Team C' }, title: 'Game 3' },
    ];
    const useGameSpy = jest.spyOn(GameContext, 'useGame');
    useGameSpy.mockReturnValue({
      gameCardData,
      setShowCreateGameModal: setShowCreateGameModalSpy,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the component', () => {
    // assign
    // act
    render(<GamesPage logoUrl="example.com/logo.png" />);
    const createGameModal = screen.getByTestId('create-game-modal');
    // assert
    expect(createGameModal).toBeInTheDocument();
  });

  it('should open the create game modal when the create button is clicked', () => {
    // assign
    // act
    render(<GamesPage logoUrl="example.com/logo.png" />);
    const createButton = screen.getByText('Create +');
    fireEvent.click(createButton);
    // assert
    expect(setShowCreateGameModalSpy).toHaveBeenCalledWith(true);
  });
});
