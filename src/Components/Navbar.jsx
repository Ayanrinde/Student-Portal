import React, { useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">

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

        <FaBell className="text-gray-600 text-lg" />

        {/* USER PROFILE */}
        <div className="relative group cursor-pointer">

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#000080] flex items-center justify-center text-white">
              {user?.initials || "U"}
            </div>

            <div className="hidden sm:block">
              <p className="font-semibold">{user?.name || "User"}</p>
              <p className="text-sm text-gray-500">{user?.role || "Student"}</p>
            </div>
          </div>

          {/* DROPDOWN */}
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block">
            <button
              className="block w-full text-left text-sm mb-2 hover:text-blue-600"
            >
              Profile
            </button>

            <button
              className="block w-full text-left text-sm mb-2 hover:text-blue-600"
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;