import React from "react";

function DashboardStats({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {/* الخط المموج باستخدام SVG */}
      <div className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="w-full h-8"
        >
          <path
            d="M0,20 Q12.5,0 25,20 T50,20 T75,20 T100,20 T125,20 T150,20 T175,20 T200,20"
            fill="none"
            stroke="#a3a3a3" /* لون الخط */
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  );
}

export default DashboardStats;
