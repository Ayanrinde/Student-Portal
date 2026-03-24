import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar - hidden on mobile, sticky on desktop */}
      <div className={`
        fixed top-0 left-0 h-full z-30 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:sticky md:translate-x-0 md:top-0 md:h-screen md:flex-shrink-0
      `}>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content - full width on mobile, shrinks on desktop */}
      <div className="flex-1 flex flex-col min-h-screen w-full">

        {/* Navbar - sticky at top */}
        <div className="sticky top-0 z-10">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 flex-1">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;