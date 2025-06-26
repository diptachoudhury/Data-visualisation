import { 
  Home, 
  Bell, 
  Calendar, 
  Settings, 
  User,
  Menu 
} from "lucide-react"; 
import { useState } from "react";
import { Link } from "react-router-dom";



const SideNav = () =>{
  const [activeIcon, setActiveIcon] = useState("home");
return (
    <div className="w-14 bg-black  flex flex-col items-center px-4 fixed left-0 h-full z-30">
        <button className="p-2 mt-4 text-[#858882] hover:text-white">
          <Menu size={16} />
        </button>

        {/* Main Navigation Icons */}
        <div className="flex-1 flex flex-col items-center space-y-6 mt-8">
          <Link to="/" >
          <button 
            onClick={() => setActiveIcon("home")}
            className={`p-2 rounded-lg ${activeIcon === "home" ? "bg-[#161618] text-white" : "text-[#858882]"}`}
          >
            <Home size={16} />
          </button>
          </Link>
           <Link to="/notifications"> 
          <button 
            onClick={() => setActiveIcon("notification")}
            className={`p-3 rounded-lg ${activeIcon === "notification" ? "bg-[#161618] text-white" : "text-[#858882]"}`}
          >
            <Bell size={16} />
          </button>
          </Link>

           <Link to="/meet"> 
          <button 
            onClick={() => setActiveIcon("calendar")}
            className={`p-3 rounded-lg ${activeIcon === "calendar" ? "bg-[#161618] text-white" : "text-[#858882]"}`}
          >
            <Calendar size={16} />
          </button>
          </Link>
           <Link to="/settings"> 
          <button 
            onClick={() => setActiveIcon("settings")}
            className={`p-3 rounded-lg ${activeIcon === "settings" ? "bg-[#161618] text-white" : "text-[#858882]"}`}
          >
            <Settings size={16} />
          </button>
          </Link>
        </div>

        {/* User Icon (Bottom) */}
        <button className="p-3 text-[#858882] hover:text-white mt-auto">
          <User size={16} />
        </button>
      </div>
)

}


export default SideNav
