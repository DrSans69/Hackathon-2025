import { Menu, RotateCcw, Newspaper } from 'lucide-react';

const Header = ({ onMenuClick, onReset, hasMessages }) => {
  return (
    <header className="sticky top-0 z-30 glass border-b border-dark-700/50 px-4 py-3">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Menu button (mobile) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2.5 hover:bg-dark-700/50 rounded-xl transition-colors"
        >
          <Menu size={22} className="text-dark-300" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-emerald-600 
                        flex items-center justify-center shadow-lg shadow-accent/20">
            <Newspaper size={16} />
          </div>
          <span className="font-bold text-lg gradient-text hidden sm:block">News AI</span>
        </div>

        {/* Reset button */}
        <div className="w-10 md:w-auto">
          {hasMessages && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 
                       text-sm text-dark-400 hover:text-dark-100
                       hover:bg-dark-700/50 rounded-xl transition-all duration-200"
            >
              <RotateCcw size={16} />
              <span className="hidden md:inline">New Chat</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;