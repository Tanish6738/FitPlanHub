import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Plan">
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete this plan? 
        </p>
        
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel          </Button>
  <Button 
            variant="black" 
            className="bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Plan'}
         </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
