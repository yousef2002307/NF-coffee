import React, { useState, useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({
  weeklyData,
  monthlyData,
  totalpriceforcurrentmonth,
  totalpriceforpastmonth,
  changeOfPriceWeek,
  changeOfPriceMonth,
}) => {
  const [chartType, setChartType] = useState("weekly");
  const [visibleDaysWeekly, setVisibleDaysWeekly] = useState(3); // Default for weekly data
  const [visibleDaysMonthly, setVisibleDaysMonthly] = useState(3); // Default for monthly data
  const [currentMonthRange, setCurrentMonthRange] = useState(0); // Tracks current range of 3 months

  // Update visibleDays based on screen width for weekly and monthly data
  useEffect(() => {
    const updateVisibleDays = () => {
      const width = window.innerWidth;

      // For Weekly Data
      if (width < 600) {
        setVisibleDaysWeekly(2); // Small screens
      } else if (width < 900) {
        setVisibleDaysWeekly(3); // Medium screens
      } else if (width < 1100) {
        setVisibleDaysWeekly(4); // Medium screens
      } else {
        setVisibleDaysWeekly(Object.keys(weeklyData).length); // Large screens (show all days)
      }

      // For Monthly Data
      if (width < 600) {
        setVisibleDaysMonthly(3); // Small screens
      } else if (width < 900) {
        setVisibleDaysMonthly(6); // Medium screens
      } else if (width < 1100) {
        setVisibleDaysMonthly(9); // Larger medium screens
      } else if (width < 1400) {
        setVisibleDaysMonthly(10);
      } else {
        setVisibleDaysMonthly(monthlyData.length); // Large screens (show all days)
      }
    };

    updateVisibleDays(); // Initial calculation
    window.addEventListener("resize", updateVisibleDays);

    return () => {
      window.removeEventListener("resize", updateVisibleDays);
    };
  }, [weeklyData, monthlyData]);

  // Convert weekly data from object to array
  const weeklyDataArray = Object.entries(weeklyData)
    .slice(0, visibleDaysWeekly) // Limit days based on screen size
    .map(([day, value]) => ({
      day: `Day ${day}`,
      value: Number(value),
    }));

  // Prepare chart data for weekly
  const chartData =
    chartType === "weekly"
      ? weeklyDataArray
      : monthlyData
          .slice(currentMonthRange, currentMonthRange + visibleDaysMonthly) // Show 3 months window
          .map((value, index) => ({
            day: `Month ${index + 1}`,
            value: Number(value),
          }));

  const handleNext = () => {
    if (currentMonthRange + visibleDaysMonthly < monthlyData.length) {
      setCurrentMonthRange(currentMonthRange + visibleDaysMonthly);
    }
  };

  const handlePrev = () => {
    if (currentMonthRange - visibleDaysMonthly >= 0) {
      setCurrentMonthRange(currentMonthRange - visibleDaysMonthly);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Total Sales</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button
            className={`${
              chartType === "weekly"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setChartType("weekly")}
          >
            Weekly
          </button>
          <button
            className={`${
              chartType === "monthly"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setChartType("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <h2 className="text-4xl font-bold">
          LE.{" "}
          {chartType === "weekly"
            ? totalpriceforcurrentmonth
            : totalpriceforpastmonth}
        </h2>
        <div>
          <p
            className={`text-sm font-medium mt-1 ${
              chartType === "weekly"
                ? changeOfPriceWeek.startsWith("-")
                  ? "text-red-600"
                  : "text-green-600"
                : changeOfPriceMonth.startsWith("-")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {chartType === "weekly" ? changeOfPriceWeek : changeOfPriceMonth}{" "}
            than last {chartType}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8" style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFA500"
              strokeWidth={7}
              dot={{ r: 6, fill: "#FFA500" }}
              activeDot={{ r: 9, fill: "#FFA500" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Navigation Buttons for Monthly data on small screens */}
      {chartType === "monthly" && (
        <div className="flex md:hidden  justify-between mt-4">
          <button
            className="text-sm font-medium text-gray-500"
            onClick={handlePrev}
            disabled={currentMonthRange === 0}
          >
            Previous 3 Months
          </button>
          <button
            className="text-sm font-medium text-gray-500"
            onClick={handleNext}
            disabled={currentMonthRange + visibleDaysMonthly >= monthlyData.length}
          >
            Next 3 Months
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesChart;
