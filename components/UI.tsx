
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#F2B705] text-[#000000] active:scale-95 hover:bg-[#e0a904] disabled:opacity-50",
    secondary: "bg-[#000000] text-[#FFFFFF] active:scale-95 hover:bg-[#222222] disabled:opacity-50",
    outline: "border-2 border-[#000000] text-[#000000] bg-transparent active:scale-95 hover:bg-[#F2F2F2] disabled:opacity-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white border border-gray-100 rounded-xl shadow-sm p-4 transition-all ${onClick ? 'cursor-pointer active:bg-gray-50' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'yellow' | 'black' }> = ({ children, variant = 'yellow' }) => (
  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${variant === 'yellow' ? 'bg-[#F2B705] text-black' : 'bg-black text-white'}`}>
    {children}
  </span>
);

export const Toast: React.FC<{ message: string; visible: boolean; onClose: () => void }> = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 font-bold">&times;</button>
      </div>
    </div>
  );
};

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden animate-in slide-in-from-bottom-full duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-brand tracking-tight">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black p-1">
              <span className="text-2xl font-bold">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F2B705]"></div>
  </div>
);
