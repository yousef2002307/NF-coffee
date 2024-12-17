import React, { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import TopSales from "./TopSales";
import ProductTable from "./ProductTable";
import { Host } from "../../../Api/Api";

function ProductDash() {
  const [revenueData, setRevenueData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState("Yearly");
const token = localStorage.getItem('token')
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${Host}/api/v1/revenue`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRevenueData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }


  if (!revenueData) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className=" p-6 min-h-screen font-sans">
    {/* Dashboard Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Section */}
      <div className="space-y-6">
      <DashboardStats
            title="Total Products"
            value={revenueData.totalProducts}
          />
        {activeTab === "Yearly" ? (
          <DashboardStats
            title="Revenue This Year"
            value={`LE ${revenueData.revenueThisYear}`}
          />
        ) : (
          <DashboardStats
            title="Revenue This Month"
            value={`LE ${revenueData.revenueThisMonth}`}
          />
        )}
      </div>

      {/* Top Sales Section */}
      <div className="md:col-span-2">
        <TopSales

          bestSellingThisYear={revenueData.bestSellingThisYear}
          bestSellingThisMonth={revenueData.bestSellingThisMonth}
          activeTab={activeTab}
          setActiveTab={setActiveTab} 
        />
      </div>
    </div>

   
    
      
      <ProductTable />
   
  </div>
  );
}

export default ProductDash;
