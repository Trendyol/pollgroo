import React from 'react';
import { NavigationLayout } from '../../layouts';
import { useTeams } from 'contexts';
import { CreateTeamModal, TeamCard } from '../../organisms';
import { TeamData } from '../../interfaces';
import { Button } from '../../atoms';
import translate from 'translations';

interface IProps {
  logoUrl: string;
}

export const TeamsPage = ({ logoUrl }: IProps) => {
  const { teams, setShowCreateTeamModal } = useTeams();

  const handleCreateClick = () => {
    setShowCreateTeamModal(true);
  };

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText="Teams">
      <div className="px-6 pt-10 lg:px-20">
        <Button className="ml-auto block" variant="text" onClick={handleCreateClick}>
          {translate('CREATE_PLUS')}
        </Button>
        <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:grid lg:grid-cols-3">
          {teams.map((team: TeamData) => (
            <TeamCard key={team._id} isMember={team.isMember} teamId={team._id} name={team.name} />
          ))}
        </div>
      </div>
      <CreateTeamModal />
    </NavigationLayout>
  );
};
