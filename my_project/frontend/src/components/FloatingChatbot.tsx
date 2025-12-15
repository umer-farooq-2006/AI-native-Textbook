import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import RAGChatbotUI from './RAGChatbotUI';

const FloatingChatbot = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const openChatbot = () => {
    setIsOpen(true);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        if (isOpen) {
          closeChatbot();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    toggleChatbot,
    openChatbot,
    closeChatbot,
    isChatbotOpen: isOpen
  }));

  return (
    <div
      ref={chatbotRef}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        pointerEvents: 'none' // Allow clicks to pass through when chatbot is not the target
      }}
    >
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          visibility: isOpen ? 'visible' as const : 'hidden' as const,
          pointerEvents: isOpen ? 'auto' as const : 'none' as const, // Only allow interactions when open
          position: 'relative'
        }}
      >
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
      </div>
      <div
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0.8) translateY(-20px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          visibility: isOpen ? 'hidden' as const : 'visible' as const,
          pointerEvents: isOpen ? 'none' as const : 'auto' as const, // Only allow interactions when closed
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
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
      </div>
    </div>
  );
});

FloatingChatbot.displayName = 'FloatingChatbot';

export default FloatingChatbot;