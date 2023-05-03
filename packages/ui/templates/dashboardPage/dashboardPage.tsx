import React from 'react';
import { NavigationLayout } from '../../layouts';
import { GameCard } from '../../organisms';
import { useDashboard } from 'contexts';
import { GameCardData } from '../../interfaces';

interface IProps {
  logoUrl: string;
}

export const DashboardPage = ({ logoUrl }: IProps) => {
  const { gameCardData } = useDashboard();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText="Dashboard">
      <div>
        {gameCardData.map((game: GameCardData) => (
          <GameCard key={game._id} teamName={game.team.name} gameTitle={game.title} gameId={game._id} />
        ))}
      </div>
    </NavigationLayout>
  );
};
