import React from "react";

interface CardProps {
  title: string;
  description: string;
  value: string | number;
}

export const CardComponent: React.FC<CardProps> = ({ title, description, value }) => {
  return (
    <div className="bg-[#222324] border border-[#525252] rounded-lg h-fit overflow-hidden">
      <div className="p-4 border-b border-[#525252]">
        <h3 className="text-[#C9FF3B] text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
};