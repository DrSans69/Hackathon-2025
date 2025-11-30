import { User, Bot, Newspaper, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ role, content, hasNews, isTyping }) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`
      py-8 px-4 md:px-8 message-fade-in
      ${isUser ? 'bg-dark-800/30' : 'bg-transparent'}
    `}>
      <div className="max-w-3xl mx-auto flex gap-5">
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          shadow-lg transition-transform hover:scale-105
          ${isUser 
            ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-purple-500/20' 
            : 'bg-gradient-to-br from-accent to-emerald-600 shadow-accent/20'}
        `}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          {/* Role label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-semibold text-dark-100">
              {isUser ? 'You' : 'News AI'}
            </span>
            {hasNews && (
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1
                           bg-accent/15 text-accent rounded-full font-medium
                           border border-accent/20">
                <Newspaper size={12} />
                Live News
              </span>
            )}
          </div>

          {/* Message content with markdown */}
          <div className={`
            prose prose-invert max-w-none
            prose-headings:text-dark-100 prose-headings:font-semibold
            prose-p:text-dark-200 prose-p:leading-relaxed prose-p:my-3
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-dark-100 prose-strong:font-semibold
            prose-ul:text-dark-200 prose-ul:my-3
            prose-ol:text-dark-200 prose-ol:my-3
            prose-li:my-1
            prose-code:text-accent prose-code:bg-dark-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-dark-900 prose-pre:border prose-pre:border-dark-700
            prose-blockquote:border-l-accent prose-blockquote:text-dark-300
            ${isTyping ? 'typing-cursor' : ''}
          `}>
            {isTyping ? (
              <p className="text-dark-300">{content}</p>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom link renderer to open in new tab
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                  // Custom list item with better spacing
                  li: ({ node, ...props }) => (
                    <li className="ml-4" {...props} />
                  ),
                  // Custom headers with better styling
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl mb-3 mt-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl mb-2 mt-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg mb-2 mt-3" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>

          {/* Actions */}
          {!isUser && !isTyping && (
            <div className="flex items-center gap-1 mt-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-dark-500 
                         hover:text-dark-200 transition-colors px-3 py-1.5 
                         rounded-lg hover:bg-dark-700/50"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-accent" />
                    <span className="text-accent">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;