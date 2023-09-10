import React from 'react';
import { NavigationLayout } from '../../layouts';
import { GameCardData } from '../../interfaces';
import { GameCard, CreateGameModal } from '../../organisms';
import { Button } from '../../atoms';
import { useApp, useGame } from 'contexts';
import translate from 'translations';
import { Loader } from '../../molecules';

export interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

export const GamesPage = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const { gameCardData, setShowCreateGameModal } = useGame();
  const { showLoader } = useApp();

  const handleCreateClick = () => {
    setShowCreateGameModal(true);
  };

  return (
    <NavigationLayout logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} subNavigationText="Games">
      <div className="px-6 pt-10 lg:px-20">
        <Button className="ml-auto block" variant="text" onClick={handleCreateClick}>
          {translate('CREATE_PLUS')}
        </Button>
        <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:grid lg:grid-cols-3">
          {gameCardData.map((game: GameCardData) => (
            <GameCard key={game._id} teamName={game.team.name} gameTitle={game.title} gameId={game._id} />
          ))}
        </div>
      </div>
      <CreateGameModal />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
