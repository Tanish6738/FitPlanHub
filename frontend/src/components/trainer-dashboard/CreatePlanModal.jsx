import React from 'react';
import Modal from '../ui/Modal';
import PlanForm from './PlanForm';

const CreatePlanModal = ({ isOpen, onClose, onCreate, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Plan">
      <PlanForm 
        onSubmit={onCreate} 
        isLoading={isLoading}
        buttonText="Create Plan"
      />
    </Modal>
  );
};

export default CreatePlanModal;
