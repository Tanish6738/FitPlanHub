import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PlanPreviewCard from '../components/plans/PlanPreviewCard';
import FilterBar from '../components/plans/FilterBar';
import planService from '../services/plan.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    sortBy: ''
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await planService.getAllPlans();
        const plansList = Array.isArray(data) ? data : data.plans || [];
        setPlans(plansList);
        setFilteredPlans(plansList);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        setError('Failed to load plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    let result = [...plans];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(plan => 
        plan.title.toLowerCase().includes(searchTerm) || 
        plan.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.level) {
      result = result.filter(plan => plan.level === filters.level);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'duration_asc':
          result.sort((a, b) => a.duration - b.duration);
          break;
        case 'duration_desc':
          result.sort((a, b) => b.duration - a.duration);
          break;
        default:
          break;
      }
    }

    setFilteredPlans(result);
  }, [filters, plans]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Explore Plans</h1>
          <p className="text-gray-600">Find the perfect workout plan for your goals.</p>
        </div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredPlans.length === 0 ? (
          <EmptyState 
            title="No plans found" 
            message="Try adjusting your filters to find what you're looking for."
            action={
                <button 
                    onClick={() => setFilters({ search: '', level: '', sortBy: '' })}
                    className="text-blue-600 hover:underline"
                >
                    Clear all filters
                </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <PlanPreviewCard key={plan._id || plan.id} plan={plan} />
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default Plans;