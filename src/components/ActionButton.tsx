
import React from 'react';

interface ActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  variant,
  onClick,
  className = ''
}) => {
  const baseClasses = 'text-xs px-4 py-2 rounded-full flex-1 border transition-colors';
  
  const variantClasses = {
    primary: 'bg-[#282E16] hover:bg-[#3a4120] text-[#C9FF3B] border-[#C9FF3B]',
    secondary: 'bg-[#5959594D] hover:bg-[#6b6b6b4D] text-[#D5D5D5] border-[#5959594D]'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
};