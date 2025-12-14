import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.services';
import { useUser } from '../context/user_context';
import AuthForm from '../components/auth/AuthForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.loginUser({ email, password });
      const user = response.user || JSON.parse(localStorage.getItem('user'));
      
      setUser(user); 

      if (user?.role === 'trainer') {
        navigate('/trainer/dashboard');
      } else {
        navigate('/feed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm 
      title="Welcome Back"
      footerText="Don't have an account?"
      footerLink={{ to: '/register', text: 'Sign up' }}
    >
      {error && <ErrorMessage message={error} className="mb-4" />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button 
          type="submit" 
          variant="black" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </AuthForm>
  );
};

export default Login;
