import React from 'react';
import { Navigation, SubNavigation, GameResultCard } from '../../organisms';
import { IProps as IGameResultCard } from '../../organisms/gameResultCard';
import { NavigationLayout } from '../../layouts';

interface IProps {
  logoUrl: string;
  gameResultCards: IGameResultCard[];
}

export const GameResultPage = ({ logoUrl, gameResultCards }: IProps) => {
  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText="Game Result">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 mx-20 mt-10">
        {gameResultCards.map((card, index) => (
          <GameResultCard
            key={`game-result-card-${index}`}
            order={card.order}
            score={card.score}
            text={card.text}
            total={card.total}
          />
        ))}
      </div>
    </NavigationLayout>
  );
};
