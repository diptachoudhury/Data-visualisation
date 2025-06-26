// components/dashboard/DataPointTooltip.tsx
import { motion } from 'framer-motion';

interface DataPoint {
   id: string;
    x: number;
    y: number;
    value: number;
    details: {
        title: string;
        description: string;
        timestamp: string;
    };
}

interface DataPointTooltipProps {
  dataPoint: DataPoint;
}

const DataPointTooltip = ({ dataPoint }: DataPointTooltipProps) => {
  return (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ 
    opacity: 1, 
    y: dataPoint.y + 20, 
    x: dataPoint.x + 20  
  }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.2 }}
  className="absolute z-10 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
>
      <h3 className="text-sm font-semibold text-gray-800">{dataPoint.details.title}</h3>
      <p className="text-xs text-gray-600 mt-1">{dataPoint.details.description}</p>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Value:</span>
          <span className="font-medium">{dataPoint.value}</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500">Time:</span>
          <span>{dataPoint.details.timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DataPointTooltip;