import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import '../App.css'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginErrors, setLoginErrors] = useState({
    username: '',
    password: ''
  });
  const [registerErrors, setRegisterErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setLoginErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setRegisterErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginErrors({ username: '', password: '' });

    const result = await login(formData.username, formData.password);

    if (result.success) {
      navigate('/'); // Redirect to home page
    } else {
      // Set error on both fields since we don't know which one is wrong
      const errorMessage = result.error || 'Invalid username or password';
      setLoginErrors({
        username: errorMessage,
        password: errorMessage
      });
    }

    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterErrors({ username: '', email: '', password: '', confirmPassword: '' });

    // Validation
    let hasError = false;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      hasError = true;
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    if (hasError) {
      setRegisterErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const result = await register(
      registerData.username,
      registerData.email,
      registerData.password
    );

    if (result.success) {
      navigate('/'); // Redirect to home page
    } else {
      // Set error on username or email field based on the error message
      const errorMessage = result.error || 'Registration failed. Please try again.';
      if (errorMessage.toLowerCase().includes('username')) {
        newErrors.username = errorMessage;
      } else if (errorMessage.toLowerCase().includes('email')) {
        newErrors.email = errorMessage;
      } else {
        // Generic error, show on username field
        newErrors.username = errorMessage;
      }
      setRegisterErrors(newErrors);
    }

    setIsLoading(false);
  };

  return (
    <div className="app-content">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>{showRegister ? 'Register' : 'Login'}</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            maxWidth: '500px',
            margin: '0 auto 1rem auto',
            boxSizing: 'border-box'
          }}>
            {error}
          </div>
        )}

        {!showRegister ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="username" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: loginErrors.username ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: loginErrors.username ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {loginErrors.username && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {loginErrors.username}
                </p>
              )}
            </div>
            
            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="password" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: loginErrors.password ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: loginErrors.password ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {loginErrors.password && !loginErrors.username && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {loginErrors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#203d2b',
                color: 'white',
                fontSize: '1.1rem',
                padding: '0.85rem',
                borderRadius: '32px'
              }}
              onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2d5a3d')}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1rem' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setShowRegister(true);
                  setLoginErrors({ username: '', password: '' });
                  clearError();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#203d2b',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                Register here
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="reg-username" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Username</Label>
              <Input
                type="text"
                id="reg-username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
                minLength={3}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: registerErrors.username ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: registerErrors.username ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {registerErrors.username && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {registerErrors.username}
                </p>
              )}
            </div>

            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="reg-email" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Email</Label>
              <Input
                type="email"
                id="reg-email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: registerErrors.email ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: registerErrors.email ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {registerErrors.email && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {registerErrors.email}
                </p>
              )}
            </div>
            
            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="reg-password" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Password</Label>
              <Input
                type="password"
                id="reg-password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
                minLength={6}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: registerErrors.password ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: registerErrors.password ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {registerErrors.password ? (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {registerErrors.password}
                </p>
              ) : (
                <small style={{ color: '#666', fontSize: '0.9rem', marginLeft: '1rem', display: 'block', marginTop: '0.5rem' }}>At least 6 characters</small>
              )}
            </div>

            <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
              <Label htmlFor="reg-confirm" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Confirm Password</Label>
              <Input
                type="password"
                id="reg-confirm"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: registerErrors.confirmPassword ? '2px solid #dc3545' : '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: registerErrors.confirmPassword ? '#fff5f5' : '#f8f9fa',
                  color: '#000'
                }}
              />
              {registerErrors.confirmPassword && (
                <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem', marginLeft: '1rem' }}>
                  {registerErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#203d2b',
                color: 'white',
                fontSize: '1.1rem',
                padding: '0.85rem',
                borderRadius: '32px'
              }}
              onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2d5a3d')}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </Button>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1rem' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setShowRegister(false);
                  setRegisterErrors({ username: '', email: '', password: '', confirmPassword: '' });
                  clearError();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#203d2b',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login