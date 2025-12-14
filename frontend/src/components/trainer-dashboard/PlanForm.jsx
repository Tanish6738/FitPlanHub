import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

const PlanForm = ({ initialData, onSubmit, isLoading, buttonText = 'Save Plan' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    durationInDays: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        durationInDays: initialData.durationInDays || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Plan Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. 30-Day HIIT Challenge"
        required
      />
      
      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe what's included in this plan..."
        rows={4}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Price ($)"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
        
        <Input
          label="Duration (Days)"
          name="durationInDays"
          type="number"
          min="1"
          value={formData.durationInDays}
          onChange={handleChange}
          placeholder="30"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        variant="black" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : buttonText}
      </Button>
    </form>
  );
};

export default PlanForm;
