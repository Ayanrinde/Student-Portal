import React, { useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]); // re-reads when route changes so name stays fresh

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6 relative">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-xl">
          <FaBars />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block border rounded-lg px-4 py-2 w-64"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />

        {/* USER AVATAR - clickable */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="w-10 h-10 rounded-full bg-[#000080] flex items-center justify-center text-white font-semibold overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                user?.initials || "U"
              )}
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-sm">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Student"}</p>
            </div>
          </div>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <>
              {/* Backdrop to close on outside click */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl p-2 z-20 border">
                <button
                  onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  My Profile
                </button>
                <button
                  onClick={() => { navigate("/profile?tab=settings"); setDropdownOpen(false); }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Settings
                </button>
                <div className="border-t my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;