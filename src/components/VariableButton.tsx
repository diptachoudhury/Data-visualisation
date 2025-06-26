// components/VariableButton.tsx
import { Check } from 'lucide-react';
import React from 'react';

interface VariableButtonProps {
  label: string;
  selected?: boolean;
  alwaysShowCheck?: boolean;
  onClick?: () => void;
  className?: string;
}

export const VariableButton: React.FC<VariableButtonProps> = ({
  label,
  selected = false,
  alwaysShowCheck = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs text-center flex items-center justify-center border transition-all ${className} ${
        selected
          ? 'bg-[#282E16] text-[#C9FF3B] border-[#C9FF3B]'
          : 'bg-[#5959594D] text-[#D5D5D5] border-[#5959594D]'
      }`}
    >
      {label}
      {(selected || alwaysShowCheck) && (
        <Check
          size={14}
          className={`ml-1 ${
            selected ? 'text-[#C9FF3B]' : 'text-[#5959594D]'
          }`}
        />
      )}
    </button>
  );
};