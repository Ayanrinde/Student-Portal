import React, { useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  FaBook,
  FaCalendarAlt,
  FaClipboardList,
  FaFolderOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaDownload,
  FaVideo,
  FaFilePdf,
} from "react-icons/fa";

// ─── DATA ────────────────────────────────────────────────────────────────────

const availableCourses = [
  { id: 1, code: "CSC 301", title: "Data Structures", unit: 3, lecturer: "Dr. Adeyemi", semester: "First" },
  { id: 2, code: "MTH 201", title: "Linear Algebra", unit: 4, lecturer: "Prof. Okafor", semester: "First" },
  { id: 3, code: "PHY 101", title: "Physics I", unit: 3, lecturer: "Dr. Balogun", semester: "First" },
  { id: 4, code: "ENG 102", title: "Technical Writing", unit: 2, lecturer: "Mrs. Eze", semester: "First" },
  { id: 5, code: "CSC 305", title: "Computer Networks", unit: 3, lecturer: "Dr. Musa", semester: "First" },
  { id: 6, code: "CSC 307", title: "Software Engineering", unit: 3, lecturer: "Prof. Taiwo", semester: "Second" },
  { id: 7, code: "MTH 305", title: "Numerical Methods", unit: 3, lecturer: "Dr. Chukwu", semester: "Second" },
  { id: 8, code: "CSC 309", title: "Artificial Intelligence", unit: 3, lecturer: "Dr. Lawal", semester: "Second" },
  { id: 9, code: "GST 201", title: "Entrepreneurship", unit: 2, lecturer: "Mr. Nwachukwu", semester: "Second" },
  { id: 10, code: "CSC 303", title: "Operating Systems", unit: 3, lecturer: "Dr. Afolabi", semester: "First" },
];

const schedule = [
  { day: "Monday", time: "8:00 - 10:00 AM", course: "CSC 301", title: "Data Structures", room: "LT 1" },
  { day: "Monday", time: "12:00 - 2:00 PM", course: "MTH 201", title: "Linear Algebra", room: "LT 3" },
  { day: "Tuesday", time: "10:00 - 12:00 PM", course: "PHY 101", title: "Physics I", room: "Lab 2" },
  { day: "Wednesday", time: "8:00 - 10:00 AM", course: "CSC 305", title: "Computer Networks", room: "LT 2" },
  { day: "Wednesday", time: "2:00 - 4:00 PM", course: "ENG 102", title: "Technical Writing", room: "LT 5" },
  { day: "Thursday", time: "10:00 - 12:00 PM", course: "CSC 301", title: "Data Structures", room: "LT 1" },
  { day: "Friday", time: "8:00 - 10:00 AM", course: "MTH 201", title: "Linear Algebra", room: "LT 3" },
  { day: "Friday", time: "12:00 - 2:00 PM", course: "PHY 101", title: "Physics I", room: "Lab 2" },
];

const materials = [
  { id: 1, course: "CSC 301", title: "Introduction to Data Structures", type: "pdf", size: "2.3 MB" },
  { id: 2, course: "CSC 301", title: "Lecture 2 - Arrays & Linked Lists", type: "pdf", size: "1.8 MB" },
  { id: 3, course: "CSC 301", title: "Tutorial Video - Sorting Algorithms", type: "video", size: "145 MB" },
  { id: 4, course: "MTH 201", title: "Linear Algebra Notes - Week 1", type: "pdf", size: "3.1 MB" },
  { id: 5, course: "MTH 201", title: "Matrix Operations Tutorial", type: "video", size: "98 MB" },
  { id: 6, course: "PHY 101", title: "Physics I - Course Outline", type: "pdf", size: "0.9 MB" },
  { id: 7, course: "ENG 102", title: "Technical Writing Guide", type: "pdf", size: "1.4 MB" },
  { id: 8, course: "CSC 305", title: "Network Fundamentals Slides", type: "pdf", size: "4.2 MB" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayColors = {
  Monday: "bg-blue-100 text-blue-700 border-blue-200",
  Tuesday: "bg-purple-100 text-purple-700 border-purple-200",
  Wednesday: "bg-green-100 text-green-700 border-green-200",
  Thursday: "bg-orange-100 text-orange-700 border-orange-200",
  Friday: "bg-red-100 text-red-700 border-red-200",
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Courses = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [registeredIds, setRegisteredIds] = useState([1, 2, 3, 4, 5]);
  const [search, setSearch] = useState("");
  const [materialFilter, setMaterialFilter] = useState("All");

  const totalUnits = availableCourses
    .filter((c) => registeredIds.includes(c.id))
    .reduce((sum, c) => sum + c.unit, 0);

  const toggleRegister = (id) => {
    setRegisteredIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredCourses = availableCourses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase())
  );

  const registeredCourses = availableCourses.filter((c) =>
    registeredIds.includes(c.id)
  );

  const filteredMaterials =
    materialFilter === "All"
      ? materials
      : materials.filter((m) => m.course === materialFilter);

  const tabs = [
    { key: "registration", label: "Course Registration", icon: <FaClipboardList /> },
    { key: "registered", label: "My Courses", icon: <FaBook /> },
    { key: "schedule", label: "Timetable", icon: <FaCalendarAlt /> },
    { key: "materials", label: "Materials", icon: <FaFolderOpen /> },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <p className="text-gray-500">Manage your courses, schedule and materials</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === tab.key
                ? "bg-[#000080] text-white shadow"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: COURSE REGISTRATION ── */}
      {activeTab === "registration" && (
        <div>
          {/* Summary Bar */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-white rounded-xl shadow px-5 py-3 flex items-center gap-3">
              <FaBook className="text-[#000080]" />
              <div>
                <p className="text-xs text-gray-500">Registered</p>
                <p className="font-bold text-gray-800">{registeredIds.length} Courses</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow px-5 py-3 flex items-center gap-3">
              <FaClipboardList className="text-[#000080]" />
              <div>
                <p className="text-xs text-gray-500">Total Units</p>
                <p className="font-bold text-gray-800">{totalUnits} Units</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
            />
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => {
              const isRegistered = registeredIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow p-5 flex justify-between items-start"
                >
                  <div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {course.code}
                    </span>
                    <h3 className="font-semibold text-gray-800 mt-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.lecturer}</p>
                    <p className="text-sm text-gray-400">{course.unit} credit units • {course.semester} Semester</p>
                  </div>
                  <button
                    onClick={() => toggleRegister(course.id)}
                    className={`mt-1 flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition ${
                      isRegistered
                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                        : "bg-blue-50 text-[#000080] hover:bg-blue-100"
                    }`}
                  >
                    {isRegistered ? (
                      <><FaTimesCircle /> Drop</>
                    ) : (
                      <><FaCheckCircle /> Register</>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB: MY COURSES ── */}
      {activeTab === "registered" && (
        <div>
          {registeredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
              <FaBook className="text-4xl mx-auto mb-3 text-gray-300" />
              <p className="font-medium">You have no registered courses yet.</p>
              <p className="text-sm mt-1">Go to Course Registration to add courses.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow p-5 border-l-4 border-[#000080]"
                >
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {course.code}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-3">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{course.lecturer}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-400">{course.unit} credit units</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      {course.semester} Sem
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: TIMETABLE ── */}
      {activeTab === "schedule" && (
        <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">
          <h2 className="font-semibold text-lg mb-5 text-gray-800">Weekly Timetable</h2>
          <div className="space-y-4">
            {days.map((day) => {
              const daySchedule = schedule.filter((s) => s.day === day);
              return (
                <div key={day}>
                  <h3 className={`text-sm font-bold px-3 py-1 rounded-lg inline-block mb-2 border ${dayColors[day]}`}>
                    {day}
                  </h3>
                  {daySchedule.length === 0 ? (
                    <p className="text-sm text-gray-400 ml-2">No classes</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {daySchedule.map((item, idx) => (
                        <div
                          key={idx}
                          className="border rounded-xl p-4 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">{item.course}</p>
                            <p className="text-sm text-gray-500">{item.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                            {item.room}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB: MATERIALS ── */}
      {activeTab === "materials" && (
        <div>
          {/* Filter by course */}
          <div className="flex gap-2 flex-wrap mb-4">
            {["All", ...new Set(materials.map((m) => m.course))].map((f) => (
              <button
                key={f}
                onClick={() => setMaterialFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  materialFilter === f
                    ? "bg-[#000080] text-white"
                    : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${material.type === "pdf" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"}`}>
                    {material.type === "pdf" ? <FaFilePdf className="text-xl" /> : <FaVideo className="text-xl" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{material.title}</p>
                    <p className="text-sm text-gray-400">{material.course} • {material.size}</p>
                  </div>
                </div>
                <button className="text-[#000080] hover:bg-blue-50 p-2 rounded-lg transition">
                  <FaDownload />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Courses;