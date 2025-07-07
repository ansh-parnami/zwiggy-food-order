import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';
import Button from '../UI/Button';
import Input from '../UI/Input';
import './Auth.css';
import {motion} from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }

    const result = await register(email, password);
    
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
          <h1>Create Account</h1>
          <p>Join Zwiggy and start ordering delicious food</p>
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

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="auth-button"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
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