import React, { useState, useEffect, lazy, Suspense } from 'react';

// Safe wrapper component that only renders AuthComponent in browser environment
const SafeAuthComponent: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Only render AuthComponent in browser environment
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  // Fallback UI for server-side rendering
  if (!isBrowser) {
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
        <p style={{ marginBottom: '15px' }}>Loading authentication component...</p>
      </div>
    );
  }

  // Dynamically import and render the AuthComponent only in browser
  const AuthComponent = lazy(() => import('./AuthComponent'));

  return (
    <Suspense fallback={
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
        <p style={{ marginBottom: '15px' }}>Loading authentication component...</p>
      </div>
    }>
      <AuthComponent />
    </Suspense>
  );
};

export default SafeAuthComponent;