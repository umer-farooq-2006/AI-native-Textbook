import React, { useState, useEffect, lazy, Suspense } from 'react';

// Safe wrapper component that only renders PersonalizationSettings in browser environment
const SafePersonalizationSettings: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Only render PersonalizationSettings in browser environment
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
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Personalization Settings</h3>
        <p>Loading personalization settings...</p>
      </div>
    );
  }

  // Dynamically import and render the PersonalizationSettings only in browser
  const PersonalizationSettings = lazy(() => import('./PersonalizationSettings'));

  return (
    <Suspense fallback={
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Personalization Settings</h3>
        <p>Loading personalization settings...</p>
      </div>
    }>
      <PersonalizationSettings />
    </Suspense>
  );
};

export default SafePersonalizationSettings;