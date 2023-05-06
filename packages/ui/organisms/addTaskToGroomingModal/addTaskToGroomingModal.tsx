import React from 'react';
import { Modal } from '../../molecules';
import { useGrooming } from 'contexts';
import { AddTaskToGroomingForm } from '../addTaskToGroomingForm';

export const AddTaskToGroomingModal = () => {
  const { showAddTaskToGameModal, setShowAddTaskToGameModal } = useGrooming();
  return (
    <Modal title="Add Task To Game" show={showAddTaskToGameModal} onClose={setShowAddTaskToGameModal}>
      <AddTaskToGroomingForm />
    </Modal>
  );
};
