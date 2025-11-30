import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Message from './components/Message';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import { sendMessage, resetConversation } from './services/api';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, history);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        hasNews: response.has_news_context
      };
      
      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      setHistory(response.history);

      // Create or update conversation
      if (!activeConversationId) {
        // New conversation
        const newConv = {
          id: Date.now(),
          title: content.slice(0, 35) + (content.length > 35 ? '...' : ''),
          hasNews: response.has_news_context,
          messages: updatedMessages,
          history: response.history
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveConversationId(newConv.id);
      } else {
        // Update existing conversation
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? { ...conv, messages: updatedMessages, history: response.history, hasNews: conv.hasNews || response.has_news_context }
            : conv
        ));
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please check your connection and try again.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    setMessages([]);
    setHistory([]);
    setActiveConversationId(null);
    setSidebarOpen(false);
    try {
      await resetConversation();
    } catch (e) {
      console.error('Reset error:', e);
    }
  };

  const handleSelectConversation = (id) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setActiveConversationId(id);
      setMessages(conv.messages || []);
      setHistory(conv.history || []);
      setSidebarOpen(false);
    }
  };

  const handleExampleClick = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="h-screen flex bg-dark-800">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        activeId={activeConversationId}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onReset={handleNewChat}
          hasMessages={messages.length > 0}
        />

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen 
              onExampleClick={handleExampleClick}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <>
              <div className="pb-4">
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    role={msg.role}
                    content={msg.content}
                    hasNews={msg.hasNews}
                  />
                ))}
                {isLoading && (
                  <Message
                    role="assistant"
                    content="Searching for the latest news..."
                    isTyping={true}
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}
        </div>

        {/* Only show input when there are messages */}
        {messages.length > 0 && (
          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            onStop={() => setIsLoading(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;