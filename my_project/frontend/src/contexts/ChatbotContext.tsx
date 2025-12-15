import React, { createContext, useContext, ReactNode } from 'react';

interface ChatbotContextType {
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  isChatbotOpen: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

interface ChatbotProviderProps {
  children: ReactNode;
  chatbotState: boolean;
  setChatbotState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
  chatbotState,
  setChatbotState
}) => {
  const openChatbot = () => setChatbotState(true);
  const closeChatbot = () => setChatbotState(false);
  const toggleChatbot = () => setChatbotState(prev => !prev);

  const value = {
    openChatbot,
    closeChatbot,
    toggleChatbot,
    isChatbotOpen: chatbotState
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};