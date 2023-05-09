import React from 'react';
import { Modal } from '../../molecules';
import { useTeams } from 'contexts';
import { CreateTeamForm } from '../createTeamForm';

export const CreateTeamModal = () => {
  const { showCreateTeamModal, setShowCreateTeamModal } = useTeams();

  return (
    <Modal show={showCreateTeamModal} onClose={setShowCreateTeamModal} title={'Create Team'}>
      <CreateTeamForm />
    </Modal>
  );
};
