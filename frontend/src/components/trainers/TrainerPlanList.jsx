import React from 'react';
import PlanPreviewCard from '../plans/PlanPreviewCard';

const TrainerPlanList = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-300 bg-gray-50">
        <p className="text-gray-500">This trainer hasn't published any plans yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 border-b border-black pb-2 inline-block">
        Available Plans
      </h2>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <PlanPreviewCard key={plan._id} plan={plan} />
        ))}      </div>
    </div>
  );
};

export default TrainerPlanList;
