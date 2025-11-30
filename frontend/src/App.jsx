import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Message from './components/Message';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import { sendMessage, getConversations, getConversation, deleteConversation } from './services/api';
import { authService } from './services/auth';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const messagesEndRef = useRef(null);

  // Check auth and load conversations on mount
  useEffect(() => {
    if (!initialLoadDone) {
      checkAuthAndLoadData();
      setInitialLoadDone(true);
    }
  }, [initialLoadDone]);

  const checkAuthAndLoadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await loadConversations();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setConversations([]);
    }
  };

  // Called when user logs in
  const handleAuthSuccess = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await loadConversations();
      }
    } catch (error) {
      console.error('Auth success handler failed:', error);
    }
  };

  // Called when user logs out
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setConversations([]);
    setMessages([]);
    setHistory([]);
    setActiveConversationId(null);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, activeConversationId, history);
      
      console.log('API Response:', response); // Debug log
      
      if (!response || !response.response) {
        throw new Error('Empty response from server');
      }
      
      const assistantMessage = { 
        role: 'assistant', 
        content: response.response,
        hasNewsContext: response.has_news_context || false
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update conversation ID if new conversation was created
      if (response.conversation_id) {
        setActiveConversationId(response.conversation_id);
        // Reload conversations to show the new one in sidebar
        if (user) {
          await loadConversations();
        }
      }
      
      // Update history
      if (response.history) {
        setHistory(response.history);
      } else {
        // Build history manually if not returned
        setHistory(prev => [
          ...prev,
          { role: 'user', content },
          { role: 'assistant', content: response.response }
        ]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, something went wrong: ${error.message}`,
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    setHistory([]);
  };

  const handleSelectConversation = async (id) => {
    try {
      const conversation = await getConversation(id);
      console.log('Loaded conversation:', conversation); // Debug log
      
      setActiveConversationId(id);
      
      const loadedMessages = (conversation.messages || []).map(msg => ({
        role: msg.role,
        content: msg.content,
        hasNewsContext: msg.has_news_context || false
      }));
      
      setMessages(loadedMessages);
      setHistory((conversation.messages || []).map(msg => ({
        role: msg.role,
        content: msg.content
      })));
      setSidebarOpen(false);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await deleteConversation(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeConversationId === id) {
        handleNewChat();
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const handleExampleClick = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen bg-dark-900 text-dark-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        onDelete={handleDeleteConversation}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen 
              onExampleClick={handleExampleClick}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6">
              {messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-dark-400 py-4">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - only show if there are messages */}
        {messages.length > 0 && (
          <div className="border-t border-dark-700 p-4">
            <div className="max-w-3xl mx-auto">
              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;