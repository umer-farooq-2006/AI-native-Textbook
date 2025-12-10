import React from 'react';
import { usePersonalization } from './PersonalizationContext';

const PersonalizationSettings: React.FC = () => {
  // Try to get the personalization context, and handle if it's not available
  let context;
  try {
    context = usePersonalization();
  } catch (e) {
    // If there's an error getting the context (e.g., not wrapped in PersonalizationProvider), return fallback UI
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px'}}>Personalization Settings</h3>
        <p>Personalization service is not available</p>
        <button
          onClick={() => alert('Please ensure the app is properly configured with PersonalizationProvider')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Service Unavailable
        </button>
      </div>
    );
  }

  const { preferences, updatePreferences } = context;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ language: e.target.value });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ theme: e.target.value as 'light' | 'dark' });
  };

  const handlePaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ learningPace: e.target.value as 'beginner' | 'intermediate' | 'advanced' });
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Personalization Settings</h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Language:
        </label>
        <select
          value={preferences.language}
          onChange={handleLanguageChange}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <option value="en">English</option>
          <option value="ur">Urdu</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Theme:
        </label>
        <select
          value={preferences.theme}
          onChange={handleThemeChange}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Learning Pace:
        </label>
        <select
          value={preferences.learningPace}
          onChange={handlePaceChange}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '4px' }}>
        <p style={{ margin: 0, color: '#2980b9', fontWeight: 'bold' }}>
          💡 Your preferences are saved automatically and will persist between sessions.
        </p>
      </div>
    </div>
  );
};

export default PersonalizationSettings;