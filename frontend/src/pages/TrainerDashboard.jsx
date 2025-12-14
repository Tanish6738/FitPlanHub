import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TrainerPlanCard from '../components/trainer-dashboard/TrainerPlanCard';
import CreatePlanModal from '../components/trainer-dashboard/CreatePlanModal';
import EditPlanModal from '../components/trainer-dashboard/EditPlanModal';
import DeleteConfirmModal from '../components/trainer-dashboard/DeleteConfirmModal';
import planService from '../services/plan.services';
import { useUser } from '../context/user_context';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ToastNotification from '../components/ui/ToastNotification';
import { useNavigate } from 'react-router-dom';

const TrainerDashboard = () => {
  const { user, loading: userLoading } = useUser();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deletingPlanId, setDeletingPlanId] = useState(null);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (!userLoading && user && user.role !== 'trainer') {
      navigate('/feed'); 
      return;
    }

    if (user) {
      fetchTrainerPlans();
    }
  }, [user, userLoading, navigate]);

  const fetchTrainerPlans = async () => {
    try {
      setLoading(true);
      const trainerId = user._id || user.id;
      if (!trainerId) {
        console.error("User ID not found");
        return;
      }
      const data = await planService.getAllPlans(trainerId);
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setError('Failed to load your plans.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      setActionLoading(true);
      await planService.createPlan(planData);
      setToast({ message: 'Plan created successfully!', type: 'success' });
      setIsCreateModalOpen(false);
      fetchTrainerPlans();
    } catch (err) {
      console.error("Create plan failed:", err);
      setToast({ message: err.response?.data?.message || 'Failed to create plan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePlan = async (planData) => {
    if (!editingPlan) return;
    try {
      setActionLoading(true);
      await planService.updatePlan(editingPlan._id, planData);
      setToast({ message: 'Plan updated successfully!', type: 'success' });
      setEditingPlan(null);
      fetchTrainerPlans();
    } catch (err) {
      console.error("Update plan failed:", err);
      setToast({ message: err.response?.data?.message || 'Failed to update plan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePlan = async () => {
    if (!deletingPlanId) return;
    try {
      setActionLoading(true);
      await planService.deletePlan(deletingPlanId);
      setToast({ message: 'Plan deleted successfully!', type: 'success' });
      setDeletingPlanId(null);
      fetchTrainerPlans();
    } catch (err) {
      console.error("Delete plan failed:", err);
      setToast({ message: err.response?.data?.message || 'Failed to delete plan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  if (userLoading) return <div className="min-h-screen flex items-center justify-center"><Loader size="large" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">Trainer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your fitness plans and track your performance.</p>
          </div>
          <Button variant="black" onClick={() => setIsCreateModalOpen(true)}>
            + Create New Plan
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-4 text-red-700 rounded">
            {error}
          </div>
        ) : plans.length === 0 ? (
          <EmptyState 
            title="No plans created yet" 
            message="Start by creating your first fitness plan to share with your followers."
            action={
              <Button variant="black" onClick={() => setIsCreateModalOpen(true)}>
                Create Your First Plan
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <TrainerPlanCard 
                key={plan._id} 
                plan={plan} 
                onEdit={setEditingPlan}
                onDelete={setDeletingPlanId}
              />
            ))}
          </div>
        )}
      </main>

      

      <CreatePlanModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreatePlan}
        isLoading={actionLoading}
      />

      <EditPlanModal 
        isOpen={!!editingPlan} 
        onClose={() => setEditingPlan(null)} 
        plan={editingPlan}
        onUpdate={handleUpdatePlan}
        isLoading={actionLoading}
      />

      <DeleteConfirmModal 
        isOpen={!!deletingPlanId} 
        onClose={() => setDeletingPlanId(null)} 
        onConfirm={handleDeletePlan}
        isLoading={actionLoading}
      />

      {toast && (
        <ToastNotification 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default TrainerDashboard;
