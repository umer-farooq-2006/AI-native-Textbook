import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// Wrapper component that handles missing AuthProvider gracefully
const AuthComponent: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Try to get the auth context, and handle if it's not available
  let context;
  try {
    context = useAuth();
  } catch (e) {
    // If there's an error getting the context (e.g., not wrapped in AuthProvider), set context to null
    context = null;
  }

  if (!context) {
    // Fallback UI when not wrapped in AuthProvider
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f9f9f9',
        maxWidth: '400px',
        marginInline: 'auto'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Authentication</h3>
        <p style={{ marginBottom: '15px' }}>Authentication service is not available</p>
        <button
          onClick={() => alert('Please ensure the app is properly configured with AuthProvider')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Service Unavailable
        </button>
      </div>
    );
  }

  // If context is available, use the normal component logic
  const { login, register, logout, user, isAuthenticated } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;

      if (isLoginView) {
        success = await login(email, password);
      } else {
        success = await register(email, password, name);
      }

      if (!success) {
        setError(isLoginView ? 'Invalid email or password' : 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9',
      maxWidth: '400px',
      marginInline: 'auto'
    }}>
      {isAuthenticated() ? (
        <div>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Welcome, {user?.name}!</h3>
          <p style={{ marginBottom: '15px' }}>You are logged in as {user?.email}</p>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 15px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
            {isLoginView ? 'Login' : 'Sign Up'}
          </h3>

          {error && (
            <div style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLoginView && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLoginView}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                backgroundColor: loading ? '#bdc3c7' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                marginBottom: '10px'
              }}
            >
              {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: '14px'
              }}
            >
              {isLoginView ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;