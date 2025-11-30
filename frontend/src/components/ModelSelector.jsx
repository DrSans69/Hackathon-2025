import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles, Zap, Brain, Check } from 'lucide-react';

const models = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and efficient',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable',
    icon: Sparkles,
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Fast with vision',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
  },
];

const ModelSelector = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentModel = models.find(m => m.id === selectedModel) || models[0];
  const Icon = currentModel.icon;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5
          bg-dark-700/50 hover:bg-dark-700
          border border-dark-600/50 hover:border-dark-500
          rounded-lg transition-all duration-200
          ${isOpen ? 'bg-dark-700 border-dark-500' : ''}
        `}
      >
        <div className={`
          w-5 h-5 rounded-md bg-gradient-to-br ${currentModel.color}
          flex items-center justify-center
        `}>
          <Icon size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium text-dark-200">{currentModel.name}</span>
        <ChevronDown 
          size={14} 
          className={`text-dark-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 z-50
                      bg-dark-800 border border-dark-600/50
                      rounded-xl shadow-2xl shadow-dark-950/50
                      overflow-hidden
                      animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-3 py-2 border-b border-dark-700/50">
            <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
              Select Model
            </p>
          </div>

          {/* Options */}
          <div className="p-1.5">
            {models.map((model) => {
              const ModelIcon = model.icon;
              const isSelected = model.id === selectedModel;

              return (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-150
                    ${isSelected 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-dark-200 hover:bg-dark-700/50'}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-8 h-8 rounded-lg bg-gradient-to-br ${model.color}
                    flex items-center justify-center flex-shrink-0
                    shadow-lg
                  `}>
                    <ModelIcon size={16} className="text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${isSelected ? 'text-accent' : 'text-dark-100'}`}>
                      {model.name}
                    </p>
                    <p className="text-xs text-dark-500">{model.description}</p>
                  </div>

                  {/* Checkmark */}
                  {isSelected && (
                    <Check size={16} className="text-accent flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-dark-700/50 bg-dark-800/50">
            <p className="text-xs text-dark-500">
              Model affects response quality and speed
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;