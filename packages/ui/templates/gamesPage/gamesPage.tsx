import React from 'react';
import { NavigationLayout } from '../../layouts';
import { GameCardData } from '../../interfaces';
import { GameCard, CreateGameModal } from '../../organisms';
import { Button } from '../../atoms';
import { useGame } from 'contexts';
import translate from 'translations';

interface IProps {
  logoUrl: string;
}

export const GamesPage = ({ logoUrl }: IProps) => {
  const { gameCardData, setShowCreateGameModal } = useGame();

  const handleCreateClick = () => {
    setShowCreateGameModal(true);
  };

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText="Games">
      <div>
        <div className="px-6 pt-10 lg:px-20">
          <Button className="ml-auto block" variant="text" onClick={handleCreateClick}>
            {translate('CREATE_PLUS')}
          </Button>
          <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:flex-row lg:grid lg:grid-cols-3">
            {gameCardData.map((game: GameCardData) => (
              <GameCard key={game._id} teamName={game.team.name} gameTitle={game.title} gameId={game._id} />
            ))}
          </div>
        </div>
        <CreateGameModal />
      </div>
    </NavigationLayout>
  );
};
