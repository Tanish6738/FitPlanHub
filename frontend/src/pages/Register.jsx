import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.services';
import { useUser } from '../context/user_context';
import AuthForm from '../components/auth/AuthForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RoleSelector from '../components/auth/RoleSelector';
import ErrorMessage from '../components/ui/ErrorMessage';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.registerUser(formData);

      const user = response.user || JSON.parse(localStorage.getItem('user'));
      
      setUser(user); 

      if (user?.role === 'trainer') {
        navigate('/trainer/dashboard');
      } else {
        navigate('/feed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm 
      title="Create Account"
      footerText="Already have an account?"
      footerLink={{ to: '/login', text: 'Log in' }}
    >
      {error && <ErrorMessage message={error} className="mb-4" />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <RoleSelector 
          selectedRole={formData.role} 
          onChange={handleRoleChange} 
        />
        
        <Button 
          type="submit" 
          variant="black" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
    </AuthForm>
  );
};

export default Register;
