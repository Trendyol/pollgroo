import React from 'react';
import { Modal } from '../../molecules';
import { useGrooming } from 'contexts';
import { EditGroomingTaskForm } from '../editGroomingTaskForm';

export const EditGroomingTaskModal = () => {
  const { showEditGroomingTaskModal, setShowEditGroomingTaskModal } = useGrooming();
  return (
    <Modal title="Edit Grooming Task" show={showEditGroomingTaskModal} onClose={setShowEditGroomingTaskModal}>
      <EditGroomingTaskForm />
    </Modal>
  );
};
