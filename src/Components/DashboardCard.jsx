import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-[#000080]">{value}</h2>
      </div>

      {icon && (
        <div className="bg-gray-100 p-3 rounded-lg text-[#000080] text-xl">
          {icon}
        </div>
      )}

    </div>
  );
};

export default DashboardCard;