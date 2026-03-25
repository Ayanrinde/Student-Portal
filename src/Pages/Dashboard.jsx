import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import PerformanceChart from "../Components/PerformanceChart";
import {
  FaBook, FaChartLine, FaLayerGroup, FaTrophy,
  FaCalendarAlt, FaClock, FaCheckCircle, FaBell,
} from "react-icons/fa";

// ─── SHARED DATA (mirrors Courses.jsx) ───────────────────────────────────────
const allCourses = [
  { id: 1, code: "CSC 301", title: "Data Structures", unit: 3, lecturer: "Dr. Adeyemi" },
  { id: 2, code: "MTH 201", title: "Linear Algebra", unit: 4, lecturer: "Prof. Okafor" },
  { id: 3, code: "PHY 101", title: "Physics I", unit: 3, lecturer: "Dr. Balogun" },
  { id: 4, code: "ENG 102", title: "Technical Writing", unit: 2, lecturer: "Mrs. Eze" },
  { id: 5, code: "CSC 305", title: "Computer Networks", unit: 3, lecturer: "Dr. Musa" },
];

const gradePoints = { "A": 5.0, "A-": 4.7, "B+": 4.3, "B": 4.0, "B-": 3.7, "C+": 3.3, "C": 3.0, "F": 0.0 };
const defaultGrades = { 1: "A", 2: "B+", 3: "A-", 4: "A", 5: "B" };

const upcomingEvents = [
  { title: "Mid-term Exams", date: "March 15 - 22, 2026", type: "exam", icon: <FaClock /> },
  { title: "Spring Break", date: "March 23 - 30, 2026", type: "holiday", icon: <FaCheckCircle /> },
  { title: "Project Submission", date: "April 5, 2026", type: "deadline", icon: <FaBell /> },
  { title: "Final Exams", date: "May 10 - 17, 2026", type: "exam", icon: <FaClock /> },
];

const recentGrades = [
  { course: "CSC 301", title: "Data Structures", unit: "3 units", grade: "A" },
  { course: "MTH 201", title: "Linear Algebra", unit: "4 units", grade: "B+" },
  { course: "PHY 101", title: "Physics I", unit: "3 units", grade: "A-" },
  { course: "ENG 102", title: "Technical Writing", unit: "2 units", grade: "A" },
];

const eventColors = {
  exam: "bg-red-100 text-red-600 border-red-200",
  holiday: "bg-blue-100 text-blue-700 border-blue-200",
  deadline: "bg-orange-100 text-orange-600 border-orange-200",
};

const gradeColor = (g) => {
  if (g.startsWith("A")) return "text-green-600 bg-green-50 border-green-200";
  if (g.startsWith("B")) return "text-blue-600 bg-blue-50 border-blue-200";
  return "text-yellow-600 bg-yellow-50 border-yellow-200";
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className={`bg-white rounded-2xl shadow p-5 flex items-center gap-4 border-l-4 ${accent}`}>
    <div className={`p-3 rounded-xl text-white text-xl ${accent.replace("border-", "bg-")}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Pull real stats from course data
  const registeredCourses = allCourses;
  const totalUnits = registeredCourses.reduce((s, c) => s + c.unit, 0);
  const totalPoints = registeredCourses.reduce(
    (s, c) => s + (gradePoints[defaultGrades[c.id]] || 0) * c.unit, 0
  );
  const gpa = (totalPoints / totalUnits).toFixed(2);

  const getClass = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 4.5) return "First Class";
    if (g >= 3.5) return "2nd Class Upper";
    if (g >= 2.5) return "2nd Class Lower";
    return "Third Class";
  };

  const stats = [
    { icon: <FaBook />, label: "Registered Courses", value: registeredCourses.length, sub: "This semester", accent: "border-blue-500" },
    { icon: <FaChartLine />, label: "Current GPA", value: gpa, sub: "out of 5.0", accent: "border-green-500" },
    { icon: <FaLayerGroup />, label: "Credit Units", value: totalUnits, sub: "Total registered", accent: "border-purple-500" },
    { icon: <FaTrophy />, label: "Class Standing", value: getClass(gpa), sub: "Current standing", accent: "border-yellow-500" },
  ];

  return (
    <DashboardLayout>

      {/* ── WELCOME BANNER ── */}
      <div className="bg-[#000080] rounded-2xl p-6 mb-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <p className="text-blue-200 text-sm mb-1">{greeting} </p>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user?.name || "Student"}
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Here's an overview of your academic progress
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl px-5 py-3">
          <FaCalendarAlt className="text-blue-200 text-xl" />
          <div>
            <p className="text-xs text-blue-200">Current Session</p>
            <p className="font-semibold text-white">2025/2026 — First Semester</p>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── PERFORMANCE CHART ── */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-gray-800 text-lg">GPA Performance</h2>
            <p className="text-xs text-gray-400">Your academic trend across levels</p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            Last 4 Sessions
          </span>
        </div>
        <PerformanceChart />
      </div>

      {/* ── BOTTOM GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Upcoming Events</h2>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between border rounded-xl p-3 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg text-sm border ${eventColors[event.type]}`}>
                    {event.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                    <p className="text-xs text-gray-400">{event.date}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${eventColors[event.type]}`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Recent Grades</h2>
            <FaTrophy className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentGrades.map((item, i) => (
              <div key={i} className="flex items-center justify-between border rounded-xl p-3 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#000080] bg-opacity-10 flex items-center justify-center text-xs font-bold text-[#000080]">
                    {item.course.split(" ")[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.course} • {item.unit}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full border ${gradeColor(item.grade)}`}>
                  {item.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;