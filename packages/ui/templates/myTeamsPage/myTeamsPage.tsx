import React from 'react';
import { NavigationLayout } from '../../layouts';
import { useApp, useTeams } from 'contexts';
import { CreateTeamModal, TeamCard } from '../../organisms';
import { TeamData, UserData } from '../../interfaces';
import { Button } from '../../atoms';
import translate from 'translations';
import { Loader } from '../../molecules';

interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

interface ExtendedTeamData extends TeamData {
  totalMembers: number;
  badgeMembers: UserData[];
}

export const MyTeamsPage = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const { teams, setShowCreateTeamModal } = useTeams();
  const { showLoader } = useApp();

  const handleCreateClick = () => {
    setShowCreateTeamModal(true);
  };

  return (
    <NavigationLayout logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} subNavigationText="My Teams">
      <div className="px-6 py-10 lg:px-20">
        <Button className="ml-auto block" variant="text" onClick={handleCreateClick}>
          {translate('CREATE_PLUS')}
        </Button>
        <div className="pt-5 flex flex-col gap-5 lg:pt-10 lg:grid lg:grid-cols-3">
          {teams.map((team: ExtendedTeamData) => (
            <TeamCard
              key={team._id}
              isMember={team.isMember}
              teamId={team._id}
              name={team.name}
              badgeMembers={team.badgeMembers}
              totalMembers={team.totalMembers}
              isMyTeamsActive={true}
            />
          ))}
        </div>
      </div>
      <CreateTeamModal />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
