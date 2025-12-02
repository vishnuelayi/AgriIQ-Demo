import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, onClick, disabled, loading, fullWidth }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      ${fullWidth ? 'w-full' : ''}
      bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
      text-white font-bold py-3.5 px-6 rounded-2xl
      shadow-lg shadow-blue-500/30
      transition-all duration-200 transform active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    `}
  >
    {loading && <Loader2 className="animate-spin" size={20} />}
    {children}
  </button>
);

export default Button;