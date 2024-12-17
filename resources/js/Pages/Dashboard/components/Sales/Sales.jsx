import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, YAxis } from "recharts";
import SalesChart from "./SalesChart";
import { Host } from "../../../Api/Api";

const Sales = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const response = await fetch(`${Host}/api/v1/salespage`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
  

    completedOrdersPercentage,
    canceledOrdersPercentage,
    processingOrdersPercentage,
    shippedOrdersPercentage,
    totalPriceforCompletedOrders,
    totalPriceforCanceledOrders,
    totalPrceforProcessingOrders,
    totalPriceforShippedOrders,
    totalpriceforcurrentmonth:totalPriceForCurrentMonth,
    totalpriceforpastmonth:totalPriceForPastMonth,
    totalprice,
    changeOfPriceWeek,
    changeOfPriceMonth,
    pricesThisMonth: monthlyData,
    pricesThisWeek: weeklyDataObj,
  } = data;
  const weeklyData = Object.entries(weeklyDataObj);


 


  return (
    <div className="bg-[#f8ede5] min-h-screen p-10 md:w-[75%] w-full flex flex-col gap-8">
      <div className="">
      <SalesChart
       totalpriceforcurrentmonth={totalPriceForCurrentMonth}
       totalpriceforpastmonth={totalPriceForPastMonth}
  weeklyData={weeklyData}
  monthlyData={monthlyData} // Monthly data
  changeOfPriceWeek={changeOfPriceWeek}
  changeOfPriceMonth={changeOfPriceMonth}
/>

    </div>


    
      <div className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="flex flex-col gap-6">
<div className="flex gap-5 ">
    <div className="bg-[#16a34a] w-6 h-24 rounded-full"></div>
    <div className="text-center flex flex-col justify-center items-center">
        <p>Completed</p>
    
    <p>{totalPriceforCompletedOrders} / <span className="text-gray-500">{totalprice}</span></p>
    </div>
</div>
<div className="flex gap-5 ">
    <div className="bg-[#dc2626] w-6 h-24 rounded-full"></div>
    <div className="text-center flex flex-col justify-center items-center">
        <p>Canceled</p>
        <p>{totalPriceforCanceledOrders} / <span className="text-gray-500">{totalprice}</span></p>
    </div>
</div>
<div className="flex gap-5 ">
    <div className="bg-[#f97316] w-6 h-24 rounded-full"></div>
    <div className="text-center flex flex-col justify-center items-center">
        <p>Processing</p>
        <p>{totalPrceforProcessingOrders} / <span className="text-gray-500">{totalprice}</span></p>
    </div>
</div>
<div className="flex gap-5 ">
    <div className="bg-[#2563eb] w-6 h-24 rounded-full"></div>
    <div className="text-center flex flex-col justify-center items-center">
        <p>Shipped</p>
        <p>{totalPriceforShippedOrders} / <span className="text-gray-500">{totalprice}</span></p>
    </div>
</div>
</div>
        <div className="rounded-2xl shadow-md p-6 grid md:grid-cols-2 grid-cols-1 gap-6">
          {/* Completed Orders */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              <svg className="absolute w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#e0e0e0"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#16a34a"
                  strokeDasharray="352"
                  strokeDashoffset={(352 * (100 - parseFloat(completedOrdersPercentage))) / 100}
                  fill="none"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-32 h-32 flex justify-center items-center">
                <span className="text-2xl font-semibold">{completedOrdersPercentage}</span>
              </div>
            </div>
            <p className="mt-2 text-lg font-medium text-green-600">Completed</p>
          
          </div>

          {/* Canceled Orders */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              <svg className="absolute w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#e0e0e0"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#dc2626"
                  strokeDasharray="352"
                  strokeDashoffset={(352 * (100 - parseFloat(canceledOrdersPercentage))) / 100}
                  fill="none"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-32 h-32 flex justify-center items-center">
                <span className="text-2xl font-semibold">{canceledOrdersPercentage}</span>
              </div>
            </div>
            <p className="mt-2 text-lg font-medium text-red-600">Canceled</p>
         
          </div>

          {/* Processing Orders */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              <svg className="absolute w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#e0e0e0"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#f97316"
                  strokeDasharray="352"
                  strokeDashoffset={(352 * (100 - parseFloat(processingOrdersPercentage))) / 100}
                  fill="none"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-32 h-32 flex justify-center items-center">
                <span className="text-2xl font-semibold">{processingOrdersPercentage}</span>
              </div>
            </div>
            <p className="mt-2 text-lg font-medium text-orange-600">Processing</p>
           
          </div>

          {/* Shipped Orders */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              <svg className="absolute w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#e0e0e0"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  strokeWidth="10"
                  stroke="#2563eb"
                  strokeDasharray="352"
                  strokeDashoffset={(352 * (100 - parseFloat(shippedOrdersPercentage))) / 100}
                  fill="none"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-32 h-32 flex justify-center items-center">
                <span className="text-2xl font-semibold">{shippedOrdersPercentage}</span>
              </div>
            </div>
            <p className="mt-2 text-lg font-medium text-blue-600">Shipped</p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
