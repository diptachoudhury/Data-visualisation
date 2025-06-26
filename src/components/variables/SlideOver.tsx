// components/variables/SlideOver.tsx (or VariableEditor.tsx)
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { applyVariables, resetData } from "../../store/slices/dashboardSlice";
import { X, ChevronDown, Search, Info  } from "lucide-react";
import { VariableButton } from "../VariableButton";
import { motion } from "framer-motion"; // Import motion

interface VariableEditorProps {
  onClose: () => void;
}


const VARIABLE_INFO = {
  "CO2 Emission": "Measures carbon dioxide output from fleet operations in metric tons. Impacts environmental compliance metrics.",
  "Fleet Sizing": "Optimal number of vehicles required to meet demand while minimizing costs.",
  "Parking Rate": "Percentage of time vehicles spend parked versus in operation.",
  "Border Rate": "Frequency of cross-border trips affecting customs and regulations.",
  "Request rate": "Customer demand patterns measured in requests per hour.",
  "Battery Recharge": "Average time and frequency needed for vehicle battery recharging.",
  "Maintainenece Charge": "Scheduled maintenance costs per vehicle per quarter.",
  "Variable 1": "Primary variable used for core operational metrics."
};


export const VariableEditor: React.FC<VariableEditorProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  // Info Card on hover
 
  
  const variableCategories = [
    {
      name: "Variable category 1",
      variables: ["CO2 Emission", "Fleet Sizing"],
    },
    {
      name: "Variable Category 2",
      variables: ["Parking Rate", "Border Rate", "Request rate"],
    },
    {
      name: "Variable Category 3",
      variables: ["Battery Recharge", "Maintainenece Charge"],
    },
  ];


    const handleVariableHover = (variableName: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
    const timeout = setTimeout(() => {
      setActiveInfo(variableName);
    }, 500); 
    
    setHoverTimeout(timeout);
  };

  const handleVariableLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const toggleVariable = (variable: string) => {
    setSelectedVariables((prev) =>
      prev.includes(variable)
        ? prev.filter((v) => v !== variable)
        : [...prev, variable]
    );
  };

  const handleApply = () => {
    dispatch(applyVariables(selectedVariables));
  };

  const handleReset = () => {
    setSelectedVariables([]);
    dispatch(resetData());
  };

  const filteredCategories = variableCategories.map(category => ({
    ...category,
    variables: category.variables.filter(variable =>
      variable.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.variables.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-black border border-[#161618]  w-sd md:w-ld h-full overflow-y-auto px-5"
      >
        <div className="py-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Edit Variables</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="py-4 ">
          <div className="flex space-x-3">
            <div className="relative w-3/4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#525252] rounded-lg bg-[#161618] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C9FF3B]"
                placeholder="Search variables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="text-xs px-1 py-0 rounded-xl flex-1 border transition-colors bg-[#5959594D] hover:bg-[#6b6b6b4D] text-[#D5D5D5] border-[#5959594D]">
              Autofill
            </button>
            <button onClick={handleApply} className="text-xs px-1 py-0 rounded-xl flex-1 border transition-colors bg-[#282E16] hover:bg-[#3a4120] text-[#C9FF3B] border-[#C9FF3B]">
              Rerun
            </button>
          </div>
        </div>

        <div className="my-2 p-4 bg-[#161618] border border-[#525252] rounded-lg">
          {filteredCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {category.variables.map((variable) => (

 <div
                    key={`${category.name}-${variable}`}
                    onMouseEnter={() => handleVariableHover(variable)}
                    onMouseLeave={handleVariableLeave}
                  >


                  <VariableButton
                   
                    label={variable}
                    selected={selectedVariables.includes(variable)}
                    onClick={() => toggleVariable(variable)}
                  />
                  </div>
                ))}
              </div>
            </div>
          ))}

         {activeInfo &&
         
         <div className="sticky bottom-0 bg-[#222324] border-t border-[#525252] -mx-4 p-4 px-8">

          <div className="flex flex-col">
            <div className="flex">
             <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-[#C9FF3B]" />
                    <h4 className="text-white text-sm font-medium mb-1">
                {activeInfo || "Hover over a variable for details"}
              </h4>
              </div>
            <div>
              <p className="text-gray-300 text-xs">
                {activeInfo && VARIABLE_INFO[activeInfo as keyof typeof VARIABLE_INFO]  
                 }
              </p>
            </div>
          </div>
          </div>} 

          <div className="mt-8">
            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">
              Primary Variables
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <VariableButton label="Variable 1" alwaysShowCheck />
            </div>
          </div>

          <div className="p-1 mt-4">
            <div className="flex items-center justify-between bg-[#161618] border border-[#525252] rounded-lg p-3 mt-2">
              <div className="text-[#C9FF3B] text-xs text-center">
                Primary Variables
              </div>
              <button
                className="flex items-center p-1 rounded-full text-xs font-semibold
                           text-[#C9FF3B] border border-[#C9FF3B]
                           hover:bg-[#C9FF3B]/10 transition-colors duration-200"
              >
                <ChevronDown size={10} />
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#161618] border border-[#525252] rounded-lg p-3 mt-2">
              <div className="text-[#C9FF3B] text-xs text-center">
                Secondary Variables
              </div>
              <button
                className="flex items-center p-1 rounded-full text-xs font-semibold
                           text-[#C9FF3B] border border-[#C9FF3B]
                           hover:bg-[#C9FF3B]/10 transition-colors duration-200"
              >
                <ChevronDown size={10} />
              </button>
            </div>
          </div>







        </div>
      </motion.div>
    </motion.div>
  );
};