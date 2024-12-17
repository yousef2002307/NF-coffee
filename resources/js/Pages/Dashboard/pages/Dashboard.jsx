import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="dashboard-container flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="dashboard-content bg-[#F3ECE6] p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
