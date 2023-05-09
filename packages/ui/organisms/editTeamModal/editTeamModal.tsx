import React from 'react'
import { useTeam } from 'contexts';
import { Modal } from '../../molecules';
import { EditTeamForm } from '../editTeamForm';

export const EditTeamModal = () => {
  const { showEditTeamModal, setShowEditTeamModal } = useTeam();
  return (
    <Modal title="Edit Team" show={showEditTeamModal} onClose={setShowEditTeamModal}>
      <EditTeamForm />
    </Modal>
  );
}
