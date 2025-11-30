import { useState, useRef, useEffect } from 'react';
import { Send, Square, Sparkles } from 'lucide-react';

const ChatInput = ({ onSend, isLoading, onStop }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
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

  return (
    <div className="border-t border-dark-700/50 glass p-4 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
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
                     focus:outline-none max-h-[200px]
                     disabled:opacity-50 text-[15px]"
          />

          {/* Button */}
          <div className="p-2">
            {isLoading ? (
              <button
                type="button"
                onClick={onStop}
                className="p-3 bg-red-500/20 hover:bg-red-500/30 
                         text-red-400 rounded-xl transition-all duration-200
                         hover:scale-105 active:scale-95"
              >
                <Square size={18} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-3 bg-accent hover:bg-accent-hover 
                         disabled:bg-dark-600 disabled:text-dark-500
                         text-white rounded-xl transition-all duration-200
                         disabled:cursor-not-allowed
                         enabled:hover:scale-105 enabled:active:scale-95
                         enabled:shadow-lg enabled:shadow-accent/30"
              >
                <Send size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-dark-500 mt-4">
          Press <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-dark-400 font-mono">Enter</kbd> to send, 
          <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-dark-400 font-mono ml-1">Shift+Enter</kbd> for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInput;