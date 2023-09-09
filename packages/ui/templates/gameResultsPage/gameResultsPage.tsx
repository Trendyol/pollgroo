import React from 'react';
import { useGamesResult } from 'contexts';
import { NavigationLayout } from '../../layouts';
import { GameCard } from '../../organisms';
import { GameCardData } from '../../interfaces';

interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

export const GameResultsPage = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const { gamesResult } = useGamesResult();

  return (
    <NavigationLayout logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} subNavigationText="Game Results">
      <div className="px-6 pt-10 lg:px-20">
        <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:grid lg:grid-cols-3">
          {gamesResult.map((game: GameCardData) => (
            <GameCard key={game._id} gameId={game._id} teamName={game.team.name} gameTitle={game.title} isDone />
          ))}
        </div>
      </div>
    </NavigationLayout>
  );
};
