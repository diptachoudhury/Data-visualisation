import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const TopNav = () => {
  const [activeTab, setActiveTab] = useState("charging");
  const { 
    loginWithRedirect, 
    logout, 
    isAuthenticated,
    user 
  } = useAuth0();


  return (
    <header className="bg-black px-6 py-4 flex items-center justify-between fixed left-4 w-full">

      <div className="flex items-center space-x-8 ml-8">
        <button
          onClick={() => setActiveTab("charging")}
          className={`text-xs font-medium bg-[#242424] p-2 rounded-md ${activeTab === "charging" ? "text-white" : "text-[#858882]"}`}
        >
          Charging Station
        </button>
        <button
          onClick={() => setActiveTab("fleet")}
          className={`text-xs font-medium ${activeTab === "fleet" ? "text-white" : "text-[#858882]"}`}
        >
          Fleet Size
        </button>
        <button
          onClick={() => setActiveTab("parking")}
          className={`text-xs font-medium ${activeTab === "parking" ? "text-white" : "text-[#858882]"}`}
        >
          Parking
        </button>
      </div>

      {/* Right side - Search bar */}
      <div className="flex gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#858882]" />
        </div>
        <input
          type="text"
          className="bg-[#161618] text-white text-xs rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#C9FF3B]"
          placeholder="Search..."
        />
      </div>
        <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()} className="flex items-center p-1 px-2 rounded-lg text-xs font-normal
                           text-[#C9FF3B] border border-[#C9FF3B]">
          Log In
        </button>
      ) : (
        <div className="flex gap-3 align-middle">
          <div className='text-white text-xs pt-1'>
            {user?.name.slice(0,8)}  
          </div>  
          <button onClick={() => logout({ 
           logoutParams: { returnTo: window.location.origin }
           
          })} className="flex items-center p-1 px-2 rounded-lg text-xs font-normal
                           text-[#C9FF3B] border border-[#C9FF3B]">
            Log Out
          </button>
        </div>
      )}
    </div>

      </div>
    </header>
  );
};

export default TopNav;