import React from "react";
import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import { AnimatePresence } from "framer-motion";
import { VariableEditor } from "../components/variables/SlideOver";
import { RotateCcw, Upload, Zap } from "lucide-react";
const Hero = () => {
  const [showVariableEditor, setShowVariableEditor] = useState(false);

  const handleOpenDrawer = () => setShowVariableEditor(true);
  const handleCloseDrawer = () => setShowVariableEditor(false);
  return (
    <>
      <div className=" p-6  rounded-l-lg">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <Zap size={24} color="white" />
            <span>Charging Station</span>
          </h1>
          <div className="flex items-center gap-2">
            {/* Rewind Icon */}
            <button className="text-[#858882] hover:text-white p-1">
              <RotateCcw size={18} />
            </button>

            {/* Edit Variables Button */}
            <button
              onClick={handleOpenDrawer}
              className="bg-[#242424] text-white text-xs px-3 py-2 rounded-sm hover:bg-[#303030] transition-colors"
            >
              Edit Variables
            </button>

            {/* Upload Icon */}
            <button className="text-[#858882] hover:text-white p-1">
              <Upload size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="   border-[#525252]">
            <h2 className="text-md font-semibold text-[#DCFF7FFD] mb-5">
              Best Scenario Results
            </h2>

            <div className="">
              <div className="mb-3 flex-1 bg-[#222324] p-3 px-4 rounded border border-[#C8E972]">
                <div className="">
                  <p className="text-[#C9FF3B] font-semibold text-xs">
                    The best found configuration based on profit is
                    characterized by 11 zones (max) with charging stations and
                    48 total number of poles.
                  </p>
                </div>
              </div>

              <div className="mt-2 flex-1 bg-[#222324] p-3  px-4  rounded border border-[#C8E972]">
                <div className="">
                  <p className="text-[#C9FF3B] font-semibold  text-xs">
                    The best found configuration based on satisfied demand is
                    characterized by 11 zones (max) with charging stations and
                    48 total number of poles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dashboard />
      <AnimatePresence>
        {showVariableEditor && <VariableEditor onClose={handleCloseDrawer} />}
      </AnimatePresence>
    </>
  );
};

export default Hero;
