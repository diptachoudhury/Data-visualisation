import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./sections/Hero";
import SideNav from "./sections/layout/SideNav";
import TopNav from "./sections/layout/TopNav";
import DynamicPage from "./pages/DynamicPages"; 

const App = () => {
  return (
  // Set up the router for client-side routing
      <Router>
      <div className="min-h-screen flex">
        <SideNav />
        <div className="flex-1 flex flex-col bg-[#161618] rounded-ss-3xl">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-6 pt-16 pl-20">
             {/* Route for the homepage, displays the Hero component */}
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/:slug" element={<DynamicPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;