import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 h-full bg-[#000080] text-white p-5 flex flex-col justify-between">
      <div>
        {/* Header with close button on mobile */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">ScholarHub UNI</h1>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            onClick={toggleSidebar}
            className="flex gap-3 p-2 hover:bg-blue-700 rounded"
          >
            <FaHome /> Dashboard
          </Link>

          <Link
            to="/courses"
            onClick={toggleSidebar}
            className="flex gap-3 p-2 hover:bg-blue-700 rounded"
          >
            <FaBook /> Courses
          </Link>

          <Link
            to="/results"
            onClick={toggleSidebar}
            className="flex gap-3 p-2 hover:bg-blue-700 rounded"
          >
            <FaChartBar /> Results
          </Link>

          <Link
            to="/profile"
            onClick={toggleSidebar}
            className="flex gap-3 p-2 hover:bg-blue-700 rounded"
          >
            <FaUser /> Profile
          </Link>
        </nav>
      </div>

      <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-50 rounded-lg transition">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;