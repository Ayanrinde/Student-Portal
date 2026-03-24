import React, { useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  FaChartBar,
  FaCalculator,
  FaFileAlt,
  FaTrophy,
  FaDownload,
  FaPrint,
} from "react-icons/fa";

// ─── SHARED DATA ─────────────────────────────────────────────────────────────

const allCourses = [
  { id: 1, code: "CSC 301", title: "Data Structures", unit: 3, lecturer: "Dr. Adeyemi", semester: "First", level: "300" },
  { id: 2, code: "MTH 201", title: "Linear Algebra", unit: 4, lecturer: "Prof. Okafor", semester: "First", level: "200" },
  { id: 3, code: "PHY 101", title: "Physics I", unit: 3, lecturer: "Dr. Balogun", semester: "First", level: "100" },
  { id: 4, code: "ENG 102", title: "Technical Writing", unit: 2, lecturer: "Mrs. Eze", semester: "First", level: "100" },
  { id: 5, code: "CSC 305", title: "Computer Networks", unit: 3, lecturer: "Dr. Musa", semester: "First", level: "300" },
  { id: 6, code: "CSC 307", title: "Software Engineering", unit: 3, lecturer: "Prof. Taiwo", semester: "Second", level: "300" },
  { id: 7, code: "MTH 305", title: "Numerical Methods", unit: 3, lecturer: "Dr. Chukwu", semester: "Second", level: "300" },
  { id: 8, code: "CSC 309", title: "Artificial Intelligence", unit: 3, lecturer: "Dr. Lawal", semester: "Second", level: "300" },
  { id: 9, code: "GST 201", title: "Entrepreneurship", unit: 2, lecturer: "Mr. Nwachukwu", semester: "Second", level: "200" },
  { id: 10, code: "CSC 303", title: "Operating Systems", unit: 3, lecturer: "Dr. Afolabi", semester: "First", level: "300" },
];

const defaultGrades = { 1: "A", 2: "B+", 3: "A-", 4: "A", 5: "B", 6: "A", 7: "B+", 8: "A-", 9: "A", 10: "B" };

const gradePoints = { "A": 5.0, "A-": 4.7, "B+": 4.3, "B": 4.0, "B-": 3.7, "C+": 3.3, "C": 3.0, "C-": 2.7, "D": 2.0, "F": 0.0 };
const gradeScores = { "A": "70-100", "A-": "65-69", "B+": "60-64", "B": "55-59", "B-": "50-54", "C+": "45-49", "C": "40-44", "C-": "35-39", "D": "30-34", "F": "0-29" };

const registeredIds = [1, 2, 3, 4, 5];

const getGradeColor = (grade) => {
  if (grade.startsWith("A")) return "text-green-600 bg-green-50";
  if (grade.startsWith("B")) return "text-blue-600 bg-blue-50";
  if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50";
  if (grade === "D") return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
};

const calcGPA = (courses) => {
  const totalUnits = courses.reduce((s, c) => s + c.unit, 0);
  const totalPoints = courses.reduce((s, c) => s + (gradePoints[c.grade] || 0) * c.unit, 0);
  return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Results = () => {
  const [activeTab, setActiveTab] = useState("grades");
  const [calcGrades, setCalcGrades] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const registeredCourses = allCourses
    .filter((c) => registeredIds.includes(c.id))
    .map((c) => ({ ...c, grade: defaultGrades[c.id] || "B" }));

  const gpa = calcGPA(registeredCourses);
  const totalUnits = registeredCourses.reduce((s, c) => s + c.unit, 0);
  const totalPoints = registeredCourses.reduce((s, c) => s + (gradePoints[c.grade] || 0) * c.unit, 0);

  const getClass = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 4.5) return "First Class";
    if (g >= 3.5) return "Second Class Upper";
    if (g >= 2.5) return "Second Class Lower";
    if (g >= 1.5) return "Third Class";
    return "Fail";
  };

  const getClassColor = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 4.5) return "text-green-600 bg-green-50 border-green-200";
    if (g >= 3.5) return "text-blue-600 bg-blue-50 border-blue-200";
    if (g >= 2.5) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  // GPA Calculator courses
  const calcCourses = allCourses
    .filter((c) => registeredIds.includes(c.id))
    .map((c) => ({ ...c, grade: calcGrades[c.id] || defaultGrades[c.id] || "B" }));
  const calculatedGPA = calcGPA(calcCourses);

  const tabs = [
    { key: "grades", label: "Semester Results", icon: <FaChartBar /> },
    { key: "calculator", label: "GPA Calculator", icon: <FaCalculator /> },
    { key: "summary", label: "Performance Summary", icon: <FaTrophy /> },
    { key: "transcript", label: "Transcript", icon: <FaFileAlt /> },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Results</h1>
        <p className="text-gray-500">View your academic results and performance</p>
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

      {/* ── TAB: SEMESTER RESULTS ── */}
      {activeTab === "grades" && (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Current GPA", value: gpa, sub: "out of 5.0" },
              { label: "Credit Units", value: totalUnits, sub: "registered" },
              { label: "Total Points", value: totalPoints.toFixed(1), sub: "quality points" },
              { label: "Class", value: getClass(gpa), sub: "standing", small: true },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`font-bold text-[#000080] ${item.small ? "text-lg" : "text-2xl"}`}>{item.value}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="font-semibold text-gray-800">300 Level — First Semester Results</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-5 py-3 text-left">Course Code</th>
                    <th className="px-5 py-3 text-left">Course Title</th>
                    <th className="px-5 py-3 text-center">Units</th>
                    <th className="px-5 py-3 text-center">Grade</th>
                    <th className="px-5 py-3 text-center">Points</th>
                    <th className="px-5 py-3 text-center">Score Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {registeredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4 font-medium text-[#000080]">{course.code}</td>
                      <td className="px-5 py-4 text-gray-700">{course.title}</td>
                      <td className="px-5 py-4 text-center text-gray-600">{course.unit}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center text-gray-600">
                        {((gradePoints[course.grade] || 0) * course.unit).toFixed(1)}
                      </td>
                      <td className="px-5 py-4 text-center text-gray-400 text-xs">
                        {gradeScores[course.grade]}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-semibold text-sm">
                  <tr>
                    <td colSpan={2} className="px-5 py-3 text-gray-700">Total</td>
                    <td className="px-5 py-3 text-center text-gray-700">{totalUnits}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getClassColor(gpa)}`}>
                        GPA: {gpa}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center text-gray-700">{totalPoints.toFixed(1)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: GPA CALCULATOR ── */}
      {activeTab === "calculator" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-1">GPA Calculator</h2>
            <p className="text-sm text-gray-500 mb-5">Adjust grades to see how your GPA would change</p>

            <div className="space-y-3">
              {calcCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between border rounded-xl p-4">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{course.code}</p>
                    <p className="text-xs text-gray-500">{course.title} • {course.unit} units</p>
                  </div>
                  <select
                    value={calcGrades[course.id] || defaultGrades[course.id] || "B"}
                    onChange={(e) => setCalcGrades((prev) => ({ ...prev, [course.id]: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {Object.keys(gradePoints).map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Calculated Result */}
          <div className="bg-[#000080] text-white rounded-2xl shadow p-6 text-center">
            <p className="text-blue-200 text-sm mb-1">Calculated GPA</p>
            <p className="text-6xl font-bold mb-2">{calculatedGPA}</p>
            <p className="text-blue-200 text-sm">out of 5.0</p>
            <div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold border ${getClassColor(calculatedGPA)}`}>
              {getClass(calculatedGPA)}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: PERFORMANCE SUMMARY ── */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          {/* GPA Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow p-5 text-center col-span-1">
              <FaTrophy className="text-4xl text-yellow-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-[#000080]">{gpa}</p>
              <p className="text-gray-500 text-sm">Current CGPA</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${getClassColor(gpa)}`}>
                {getClass(gpa)}
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 col-span-2">
              <h3 className="font-semibold text-gray-800 mb-4">Grade Distribution</h3>
              <div className="space-y-3">
                {Object.entries(
                  registeredCourses.reduce((acc, c) => {
                    const g = c.grade.startsWith("A") ? "A" : c.grade.startsWith("B") ? "B" : c.grade.startsWith("C") ? "C" : "D/F";
                    acc[g] = (acc[g] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([grade, count]) => (
                  <div key={grade} className="flex items-center gap-3">
                    <span className="w-8 text-sm font-bold text-gray-600">{grade}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${grade === "A" ? "bg-green-500" : grade === "B" ? "bg-blue-500" : grade === "C" ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${(count / registeredCourses.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-16">{count} course{count > 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Course Performance Breakdown</h3>
            <div className="space-y-3">
              {registeredCourses.map((course) => {
                const point = gradePoints[course.grade] || 0;
                const pct = (point / 5.0) * 100;
                return (
                  <div key={course.id} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-20">{course.code}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-[#000080] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full w-12 text-center ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: TRANSCRIPT ── */}
      {activeTab === "transcript" && (
        <div>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            {/* Transcript Header */}
            <div className="bg-[#000080] text-white p-6 text-center">
              <h2 className="text-xl font-bold uppercase tracking-widest">ScholarHub University</h2>
              <p className="text-blue-200 text-sm mt-1">Official Academic Transcript</p>
            </div>

            <div className="p-6">
              {/* Student Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                {[
                  { label: "Student Name", value: user?.name || "Student" },
                  { label: "Email", value: user?.email || "N/A" },
                  { label: "Programme", value: "Computer Science" },
                  { label: "Level", value: "300 Level" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                    <p className="font-semibold text-gray-800 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Transcript Table */}
              <h3 className="font-semibold text-gray-700 mb-3">300 Level — First Semester</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border rounded-xl overflow-hidden">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">Code</th>
                      <th className="px-4 py-3 text-left">Course Title</th>
                      <th className="px-4 py-3 text-center">Units</th>
                      <th className="px-4 py-3 text-center">Grade</th>
                      <th className="px-4 py-3 text-center">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registeredCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-4 py-3 font-medium text-[#000080]">{course.code}</td>
                        <td className="px-4 py-3 text-gray-700">{course.title}</td>
                        <td className="px-4 py-3 text-center">{course.unit}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {((gradePoints[course.grade] || 0) * course.unit).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-gray-700">Semester GPA</td>
                      <td className="px-4 py-3 text-center">{totalUnits}</td>
                      <td className="px-4 py-3 text-center text-[#000080] font-bold">{gpa}</td>
                      <td className="px-4 py-3 text-center">{totalPoints.toFixed(1)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* CGPA Summary */}
              <div className={`flex justify-between items-center p-4 rounded-xl border ${getClassColor(gpa)}`}>
                <div>
                  <p className="font-bold text-lg">Cumulative GPA: {gpa} / 5.0</p>
                  <p className="text-sm">{getClass(gpa)} Honours</p>
                </div>
                <FaTrophy className="text-3xl opacity-50" />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 bg-[#000080] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#000066] transition">
                  <FaDownload /> Download PDF
                </button>
                <button className="flex items-center gap-2 bg-white border text-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                  <FaPrint /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Results;