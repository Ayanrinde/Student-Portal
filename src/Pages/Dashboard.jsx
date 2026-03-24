import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardCard from "../Components/DashboardCard";
import PerformanceChart from "../Components/PerformanceChart";
import { FaBook, FaChartBar, FaClipboardList, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name || "Student"}
        </h1>
        <p className="text-gray-500">Here's an overview of your academic progress</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Registered Courses" value="6" icon={<FaBook />} />
        <DashboardCard title="Current GPA" value="3.75" icon={<FaChartLine />} />
        <DashboardCard title="Credit Units" value="18" icon={<FaChartBar />} />
        <DashboardCard title="Total Credits Earned" value="84" icon={<FaClipboardList />} />
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Upcoming Events + Recent Grades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Events */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <EventItem title="Mid-term Exams" date="March 15 - 22, 2026" type="exam" />
            <EventItem title="Spring Break" date="March 23 - 30, 2026" type="holiday" />
            <EventItem title="Project Submission" date="April 5, 2026" type="deadline" />
            <EventItem title="Final Exams" date="May 10 - 17, 2026" type="exam" />
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Recent Grades</h2>
          <div className="space-y-4">
            <GradeItem course="CSC 301 - Data Structures" unit="3 credit units" grade="A" />
            <GradeItem course="MTH 201 - Linear Algebra" unit="4 credit units" grade="B+" />
            <GradeItem course="PHY 101 - Physics I" unit="3 credit units" grade="A-" />
            <GradeItem course="ENG 102 - Technical Writing" unit="2 credit units" grade="A" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Event Item Component
const EventItem = ({ title, date, type }) => {
  const colors = {
    exam: "bg-red-100 text-red-600",
    holiday: "bg-blue-100 text-blue-600",
    deadline: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full ${colors[type]}`}>{type}</span>
    </div>
  );
};

// Grade Item Component
const GradeItem = ({ course, unit, grade }) => {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{course}</p>
        <p className="text-sm text-gray-500">{unit}</p>
      </div>
      <span className="font-bold text-blue-700">{grade}</span>
    </div>
  );
};

export default Dashboard;