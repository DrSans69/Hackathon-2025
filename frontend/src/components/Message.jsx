import { User, Bot, Newspaper } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-4 py-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
        ${isUser 
          ? 'bg-accent/20 text-accent' 
          : 'bg-dark-700 text-dark-300'}
      `}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      
      {/* Message content */}
      <div className={`
        flex-1 min-w-0
        ${isUser ? 'text-right' : ''}
      `}>
        {/* News indicator */}
        {message.hasNewsContext && (
          <div className={`flex items-center gap-1 text-xs text-blue-400 mb-1 ${isUser ? 'justify-end' : ''}`}>
            <Newspaper size={12} />
            <span>Based on current news</span>
          </div>
        )}
        
        {/* Text content */}
        <div className={`
          inline-block px-4 py-3 rounded-2xl max-w-full text-left
          ${isUser 
            ? 'bg-accent text-white rounded-tr-sm' 
            : 'bg-dark-700 text-dark-100 rounded-tl-sm'}
          ${message.isError ? 'bg-red-500/20 text-red-400' : ''}
        `}>
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none
                          prose-p:my-2 prose-p:leading-relaxed
                          prose-headings:my-3 prose-headings:font-semibold
                          prose-ul:my-2 prose-ol:my-2
                          prose-li:my-0.5
                          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-dark-50 prose-strong:font-semibold
                          prose-code:bg-dark-600 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                          prose-pre:bg-dark-800 prose-pre:p-3 prose-pre:rounded-lg">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;