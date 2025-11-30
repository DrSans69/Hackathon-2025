import { 
  MessageSquarePlus, 
  Newspaper,
  Bot,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ onNewChat, conversations, onSelectConversation, activeId, isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full
        w-72 bg-dark-900 flex flex-col
        transform transition-transform duration-300 ease-in-out
        border-r border-dark-700/50
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5
                     bg-gradient-to-r from-accent to-emerald-600
                     hover:from-accent-hover hover:to-emerald-700
                     rounded-xl transition-all duration-300
                     shadow-lg shadow-accent/20 hover:shadow-accent/30
                     group"
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-semibold">New Chat</span>
          </button>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-800 
                           flex items-center justify-center">
                <Bot size={32} className="text-dark-500" />
              </div>
              <p className="text-dark-400 text-sm font-medium">No conversations yet</p>
              <p className="text-dark-500 text-xs mt-1">Start chatting to see history</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl
                  flex items-center gap-3 group
                  transition-all duration-200
                  ${activeId === conv.id 
                    ? 'bg-dark-700 border-l-2 border-accent shadow-lg' 
                    : 'hover:bg-dark-800/80 border-l-2 border-transparent'}
                `}
              >
                {conv.hasNews ? (
                  <Newspaper size={16} className={`flex-shrink-0 ${activeId === conv.id ? 'text-accent' : 'text-dark-400'}`} />
                ) : (
                  <MessageSquarePlus size={16} className={`flex-shrink-0 ${activeId === conv.id ? 'text-accent' : 'text-dark-500'}`} />
                )}
                <span className={`truncate text-sm ${activeId === conv.id ? 'text-dark-50 font-medium' : 'text-dark-200'}`}>
                  {conv.title}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerald-600 
                         flex items-center justify-center shadow-lg shadow-accent/20">
              <Newspaper size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-100">News AI</p>
              <p className="text-xs text-dark-500 truncate">Real-time assistant</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;