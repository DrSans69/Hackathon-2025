import { Newspaper, Zap, Globe, TrendingUp, ArrowRight, Send, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const WelcomeScreen = ({ onExampleClick, onSend, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const examples = [
    {
      icon: <Newspaper size={22} />,
      title: "Latest Headlines",
      prompt: "What's the latest news in technology?",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Globe size={22} />,
      title: "World Events",
      prompt: "What's happening in Ukraine today?",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Business & Markets",
      prompt: "What are the latest business headlines?",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Zap size={22} />,
      title: "Breaking News",
      prompt: "Any breaking news I should know about?",
      color: "from-rose-500 to-pink-500"
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-emerald-600 
                          flex items-center justify-center shadow-2xl shadow-accent/30
                          rotate-3 hover:rotate-0 transition-transform duration-300">
              <Newspaper size={40} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 
                          rounded-full flex items-center justify-center shadow-lg">
              <Zap size={14} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            News AI Assistant
          </h1>
          <p className="text-dark-400 text-lg max-w-lg mx-auto leading-relaxed">
            Your intelligent companion with <span className="text-accent font-medium">real-time access</span> to 
            current news and global events.
          </p>
        </div>

        {/* Example cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example.prompt)}
              disabled={isLoading}
              className="group relative p-5 bg-dark-800/50 hover:bg-dark-700/50 
                       border border-dark-700/50 hover:border-dark-600
                       rounded-2xl text-left transition-all duration-300
                       hover:shadow-xl hover:shadow-dark-950/50
                       hover:-translate-y-1
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-xl mb-4
                bg-gradient-to-br ${example.color}
                flex items-center justify-center text-white
                shadow-lg group-hover:scale-110 transition-transform duration-300
              `}>
                {example.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-dark-100 mb-1 flex items-center gap-2">
                {example.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 
                                                group-hover:translate-x-0 transition-all duration-300 
                                                text-accent" />
              </h3>
              <p className="text-sm text-dark-400 leading-relaxed">{example.prompt}</p>
            </button>
          ))}
        </div>

        {/* Input field directly under cards */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className={`
            relative flex items-end gap-3 
            bg-dark-700/80 rounded-2xl
            border border-dark-600/50 
            focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10
            shadow-xl shadow-dark-950/50
            transition-all duration-300
            ${isLoading ? 'pulse-glow' : ''}
          `}>
            {/* Icon */}
            <div className="absolute left-4 bottom-4 pointer-events-none">
              <Sparkles size={20} className={`
                transition-colors duration-300
                ${message ? 'text-accent' : 'text-dark-500'}
              `} />
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about current news, events, or anything..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent text-dark-100 placeholder-dark-500
                       resize-none py-4 pl-12 pr-4 
                       focus:outline-none max-h-[150px]
                       disabled:opacity-50 text-[15px]"
            />

            {/* Button */}
            <div className="p-2">
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="p-3 bg-accent hover:bg-accent-hover 
                         disabled:bg-dark-600 disabled:text-dark-500
                         text-white rounded-xl transition-all duration-200
                         disabled:cursor-not-allowed
                         enabled:hover:scale-105 enabled:active:scale-95
                         enabled:shadow-lg enabled:shadow-accent/30"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-dark-500 mt-3">
            Press <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-dark-400 font-mono">Enter</kbd> to send, 
            <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-dark-400 font-mono ml-1">Shift+Enter</kbd> for new line
          </p>
        </form>

        {/* Footer under input */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl 
                        bg-dark-800/50 border border-dark-700/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerald-600 
                         flex items-center justify-center shadow-lg shadow-accent/20">
              <Newspaper size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-dark-100">Powered by AI</p>
              <p className="text-xs text-dark-500">Real-time news integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;