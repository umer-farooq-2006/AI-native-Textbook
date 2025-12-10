import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: Array<{
    title: string;
    module: string;
    content_snippet: string;
  }>;
}

const RAGChatbotUI: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Hello! I\'m your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about ROS 2, Gazebo & Unity, NVIDIA Isaac, or Vision-Language-Action (VLA) + GPT!',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change, but with a performance-safe approach
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0); // Use setTimeout to defer the scroll until after the render is complete

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Check if the backend is available
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: data.answer || 'Sorry, I could not find an answer.',
        role: 'assistant',
        timestamp: new Date(),
        sources: data.source_documents || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching from RAG API:', error);

      // Provide a more informative message when the backend is not available
      let errorMessageContent = 'Sorry, I encountered an error while processing your question. Please try again.';

      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessageContent = 'Backend service is not available. Please make sure the backend server is running on port 8000.';
      }

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: errorMessageContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      maxWidth: '800px',
      margin: '20px 0',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '15px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#27ae60',
          marginRight: '10px'
        }}></div>
        <h3 style={{ margin: 0, fontSize: '16px' }}>AI Textbook Assistant</h3>
      </div>

      <div style={{
        height: '400px',
        overflowY: 'auto',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 15px',
                borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: message.role === 'user' ? '#3498db' : '#ecf0f1',
                color: message.role === 'user' ? 'white' : '#2c3e50',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                {message.content}
              </div>
              <div style={{
                fontSize: '11px',
                marginTop: '5px',
                opacity: 0.7,
                textAlign: 'right'
              }}>
                {formatTime(message.timestamp)}
              </div>

              {/* Sources for assistant messages */}
              {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                <div style={{
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }}>
                  <strong>Sources:</strong>
                  <ul style={{ margin: '5px 0 0 0', padding: '0 0 0 15px' }}>
                    {message.sources.slice(0, 3).map((source, index) => (
                      <li key={index} style={{ marginBottom: '3px' }}>
                        <em>{source.title}</em> ({source.module})
                      </li>
                    ))}
                    {message.sources.length > 3 && (
                      <li>... and {message.sources.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 15px',
                borderRadius: '18px 18px 18px 4px',
                backgroundColor: '#ecf0f1',
                color: '#2c3e50'
              }}
            >
              <div>Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '15px', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the textbook content..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 15px',
              border: '1px solid #ddd',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px',
              backgroundColor: loading || !input.trim() ? '#bdc3c7' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div style={{ fontSize: '11px', color: '#7f8c8d', marginTop: '8px', textAlign: 'center' }}>
          Ask about ROS 2, Gazebo & Unity, NVIDIA Isaac, or Vision-Language-Action (VLA) + GPT
        </div>
      </form>
    </div>
  );
};

export default RAGChatbotUI;
