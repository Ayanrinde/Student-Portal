import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { semester: "100L", gpa: 3.5 },
  { semester: "200L", gpa: 3.8 },
  { semester: "300L", gpa: 4.1 },
  { semester: "400L", gpa: 4.3 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#000080]">
          GPA Performance
        </h3>
        <span className="text-sm text-gray-500">
          Last 4 Sessions
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="semester" />

          <YAxis domain={[0, 5]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#000080"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PerformanceChart;