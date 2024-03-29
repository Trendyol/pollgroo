import React from 'react';
import { NavigationLayout } from '../../layouts';
import { GameCard } from '../../organisms';
import { useDashboard } from 'contexts';
import { GameCardData } from '../../interfaces';
import { EmptyPageWarningBox } from '../../molecules';
import translate from 'translations';

interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

export const DashboardPage = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const { gameCardData } = useDashboard();

  return (
    <NavigationLayout logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} subNavigationText="Dashboard">
      <div className="px-6 pt-10 lg:px-20">
        {!!gameCardData.length ? (
          <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:grid lg:grid-cols-3">
            {gameCardData.map((game: GameCardData) => (
              <GameCard key={game._id} teamName={game.team.name} gameTitle={game.title} gameId={game._id} />
            ))}
          </div>
        ) : (
          <EmptyPageWarningBox warningText={translate("DASHBOARD_WARNING_TEXT")} />
        )}
      </div>
    </NavigationLayout>
  );
};
