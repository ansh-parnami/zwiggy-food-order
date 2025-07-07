import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';
import Button from '../UI/Button';
import Input from '../UI/Input';
import './Auth.css';
import {motion} from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <motion.div className="auth-container"
         initial={{ opacity: 0, x: -50 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 50 }}
         transition={{ duration: 0.6 }}>
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Zwiggy account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <Input
            label="Email Address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="auth-button"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
          <p>
            <Link to="/" className="auth-link">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
} 