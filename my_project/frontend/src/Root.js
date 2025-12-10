import React, { useState, useEffect } from 'react';
import { PersonalizationProvider } from './components/PersonalizationContext';
import { AuthProvider } from './components/AuthContext';

// Root component that ensures providers are only rendered in browser environment
const Root = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  // During SSR, just return the children without providers
  if (!isBrowser) {
    return <>{children}</>;
  }

  // In browser, wrap with providers
  return (
    <AuthProvider>
      <PersonalizationProvider>
        {children}
      </PersonalizationProvider>
    </AuthProvider>
  );
};

export default Root;