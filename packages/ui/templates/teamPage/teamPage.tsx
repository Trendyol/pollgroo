import React from 'react';
import { useTeam } from 'contexts';
import { NavigationLayout } from '../../layouts';
import { TeamSettingsBox } from '../../organisms';

interface IProps {
  logoUrl: string;
}

export const TeamPage = ({ logoUrl }: IProps) => {
  const { team } = useTeam();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={team.name}>
      <div className="px-6 pt-10 lg:px-20">
        <TeamSettingsBox />
      </div>
    </NavigationLayout>
  );
};
