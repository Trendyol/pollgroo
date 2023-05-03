import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GameCard } from '@/organisms';
import * as nextRouter from 'next/router';

describe('<GameCard /> specs', () => {
  let routerPush: any;
  const props = {
    teamName: 'STOREFRONT CHECKOUT',
    gameTitle: 'TECH GROOMING',
    gameId: '12345',
  };

  beforeEach(() => {
    routerPush = jest.fn();
    jest.spyOn(nextRouter, 'useRouter').mockImplementation(() => ({ push: routerPush } as any));
  });

  it('renders team name and game title', () => {
    const { getByText } = render(<GameCard {...props} />);
    expect(getByText(props.teamName)).toBeInTheDocument();
    expect(getByText(props.gameTitle)).toBeInTheDocument();
  });

  it('renders View and Edit buttons', () => {
    const { getByText } = render(<GameCard {...props} />);
    expect(getByText('View')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });

  it('calls router.push with the correct URL when primary button is clicked', () => {
    const gameId = '123';
    const teamName = 'Team A';
    const gameTitle = 'Game 1';
    const isDone = false;

    const { getByText } = render(
      <GameCard gameId={gameId} teamName={teamName} gameTitle={gameTitle} isDone={isDone} />
    );

    const primaryButton = getByText('View');
    fireEvent.click(primaryButton);

    expect(routerPush).toHaveBeenCalledWith(`/grooming/${gameId}`);
  });
});
