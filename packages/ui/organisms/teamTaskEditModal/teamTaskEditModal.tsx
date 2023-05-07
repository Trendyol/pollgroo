import React from 'react';
import { useTeam } from 'contexts';
import { Modal } from '../../molecules';
import { TeamTaskEditForm } from '../teamTaskEditForm';

export const TeamTaskEditModal = () => {
  const { showEditTeamTaskModal, setShowEditTeamTaskModal } = useTeam();
  return (
    <Modal title="Edit Grooming Task" show={showEditTeamTaskModal} onClose={setShowEditTeamTaskModal}>
      <TeamTaskEditForm />
    </Modal>
  );
};
