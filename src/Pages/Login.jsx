import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import buildingImg from "../assets/building.jpg";
 
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    // Extract name from email e.g. "prince.dammy@gmail.com" → "Prince Dammy"
    const emailPrefix = email.split("@")[0];
    const name = emailPrefix
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
 
    // Extract initials e.g. "Prince Dammy" → "PD"
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
 
    const user = {
      name,
      initials,
      role: "Student",
      email,
    };
 
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - BUILDING IMAGE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center flex-col p-10">
        {/* Background Image */}
        <img
          src={buildingImg}
          alt="ScholarHub Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

        {/* Text on top of image */}
        <div className="relative z-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">ScholarHub</h1>
          <p className="text-lg text-blue-100 text-center max-w-md">
            Welcome to ScholarHub,your all-in-one student portal for managing
            courses, academic progress, and campus activities.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#000080] mb-2">Student Login</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your portal
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[#000080] mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="student@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[#000080] mb-2 font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-[#000080] mb-2 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#000080] text-white p-3 rounded-lg font-semibold hover:bg-[#000066] transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?
            <span className="text-[#000080] mb-2 ml-1 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;