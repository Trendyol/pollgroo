import React from 'react';
import { Modal } from '../../molecules';
import { useGame } from 'contexts';
import { CreateGameForm } from '../../organisms';

export const CreateGameModal = () => {
  const { showCreateGameModal, setShowCreateGameModal } = useGame();

  return (
    <Modal title="Create Game" show={showCreateGameModal} onClose={setShowCreateGameModal}>
      <CreateGameForm />
    </Modal>
  );
};
