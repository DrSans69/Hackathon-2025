import { useState } from "react";
import { Menu, User, LogOut, Newspaper } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = ({ onMenuClick, user, onAuthSuccess, onLogout }) => {
  const [showAuth, setShowAuth] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuth(false);
    onAuthSuccess?.();
  };

  return (
    <header className="h-14 border-b border-dark-700 flex items-center justify-between px-4 bg-dark-800">
      {/* Menu button */}
      {/* <button
        onClick={onMenuClick}
        className="p-2 text-dark-400 hover:text-dark-200 hover:bg-dark-700 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>
       */}
      {/* Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2.5 hover:bg-dark-700/50 rounded-xl transition-colors"
        >
          <Menu size={22} className="text-dark-300" />
        </button>
        <div
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-emerald-600 
                        flex items-center justify-center shadow-lg shadow-accent/20"
        >
          <Newspaper size={16} />
        </div>
        <span className="font-bold text-lg gradient-text  block">News AI</span>
      </div>
      {/* Title */}
      {/* <h1 className="font-semibold text-dark-100">News AI</h1> */}

      {/* Auth section */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-dark-300">{user.username}</span>
            <button
              onClick={onLogout}
              className="p-2 text-dark-400 hover:text-dark-200 hover:bg-dark-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-accent hover:bg-accent-hover 
                       text-white text-sm font-medium rounded-lg transition-colors"
          >
            <User size={16} />
            Sign In
          </button>
        )}
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default Header;
