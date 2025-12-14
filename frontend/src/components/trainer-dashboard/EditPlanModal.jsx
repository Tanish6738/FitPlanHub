import React from 'react';
import Modal from '../ui/Modal';
import PlanForm from './PlanForm';

const EditPlanModal = ({ isOpen, onClose, plan, onUpdate, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Plan">
      <PlanForm 
        initialData={plan} 
        onSubmit={onUpdate} 
        isLoading={isLoading}
        buttonText="Update Plan"
      />
    </Modal>
  );
};

export default EditPlanModal;
