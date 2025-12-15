import React, { useState } from 'react';
import RAGChatbotUI from './RAGChatbotUI';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen ? (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <RAGChatbotUI />
          <button
            onClick={toggleChatbot}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.2s ease'
          }}
          aria-label="Open chat"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;