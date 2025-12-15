import React, { useState } from 'react';
import RAGChatbotUI from './RAGChatbotUI';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {isOpen ? (
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <RAGChatbotUI />
          <button
            onClick={toggleChatbot}
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--ifm-color-danger)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              fontWeight: 'bold'
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
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-secondary) 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(67, 97, 238, 0.3)',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
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