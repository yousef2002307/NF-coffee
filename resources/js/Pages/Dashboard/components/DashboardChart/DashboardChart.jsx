import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import DateDropdown from "./DateDropdown ";
import { fetchData, fetchCompareSalesData } from "../../../Api/Api";
import Overview from "./OverviewSection";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DashboardChart = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState({
    productCount: 0,
    visitorsCount: 0,
    salesCount: 0,
    bestSellingProducts: [],
  });
  const [salesData, setSalesData] = useState([]);
  const [productColors, setProductColors] = useState({});
  const [currentRange, setCurrentRange] = useState({ start: 0, end: 1 }); 
  const token = localStorage.getItem("token");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleNext = () => {
    setCurrentRange((prev) => {
      const start = Math.min(prev.start + monthsToShow(), months.length - monthsToShow());
      const end = Math.min(start + monthsToShow(), months.length);
      return { start, end };
    });
  };
  
  const handleBack = () => {
    setCurrentRange((prev) => {
      const start = Math.max(prev.start - monthsToShow(), 0);
      const end = Math.max(start + monthsToShow(), monthsToShow());
      return { start, end };
    });
  };
  
  const monthsToShow = () => {
    if (window.innerWidth < 1000) {
      return 1; // Show 1 month on small screens
    } else if (window.innerWidth < 1300) {
      return 2; // Show 2 months on medium screens
    } else {
      return 3; // Show 3 months on large screens
    }
  };

  const formatChartData = () => {
    const chartData = months.map((month, monthIndex) => {
      const entry = { month }; // Add the month to the chart data
      selectedProducts.forEach((productId) => {
        const product = data.bestSellingProducts.find(
          (p) => p.product.id === productId
        ); // Find the product by ID
        const productSales = salesData[productId] || [];
        entry[product.product.name] = productSales[monthIndex] || 0; // Use product name as key
      });
      return entry;
    });
    return chartData.slice(currentRange.start, currentRange.end); // Paginate data
  };

  useEffect(() => {
    if (data.bestSellingProducts.length > 0) {
      const defaultSelected = data.bestSellingProducts.map(
        (product) => product.product.id
      );
      setSelectedProducts(defaultSelected);

      const colors = {};
      defaultSelected.forEach((productId) => {
        colors[productId] = getRandomColor();
      });
      setProductColors(colors);
    }
  }, [data.bestSellingProducts]);

  const fetchLastWeekData = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7); 
    const lastWeekDate = lastWeek.toISOString().split("T")[0]; 
    fetchData(lastWeekDate, token, setData);
  };

  useEffect(() => {
    if (token) {
      fetchLastWeekData();
    }
  }, [token]); 

  useEffect(() => {
    if (selectedProducts.length > 0) {
      fetchCompareSalesData(selectedYear, selectedProducts, token, setSalesData);
    }
  }, [selectedYear, selectedProducts, token]);

  useEffect(() => {
    const updateRangeForScreenSize = () => {
      const monthsVisible = monthsToShow();
      setCurrentRange({ start: 0, end: monthsVisible });
    };
  
    updateRangeForScreenSize();
    window.addEventListener("resize", updateRangeForScreenSize);
    return () => {
      window.removeEventListener("resize", updateRangeForScreenSize);
    };
  }, []);
  


  const chartData = formatChartData();

  return (
    <div className="flex flex-col ml-auto gap-5  bg-[#F7DCE1] px-6 py-4">
    <div className="bg-white p-8 flex flex-col gap-11">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
        <p>This Week’s Overview</p>
        <DateDropdown onDateChange={(date) => fetchData(date, token, setData)} />
      </div>
      <Overview data={data} />
    </div>

    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row justify-between w-full items-center mb-4">
        <h4 className="text-lg font-semibold">
          Compare Sales Performance of Popular Products Over Time
        </h4>
        <div className="flex gap-5  justify-center items-center">
          <div className="relative md:flex-row flex-col w-[100%] flex gap-5">
         
          <button
  onClick={() => setDropdownVisible((prev) => !prev)}
  className="px-4 py-2 border flex gap-3 items-center md:w-full w-[60%] rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
>
  {selectedProducts.slice(0, 2).map((productId) => {
    const color = productColors[productId];
    return color ? (
      <div
        key={productId}
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    ) : null;
  })}
  <IoIosArrowDown />
</button>

{isDropdownVisible && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute left-0 top-10 mt-2 p-4 flex flex-col gap-2 bg-white border rounded-md shadow-lg z-10"
  >
    {data.bestSellingProducts.map((product) => {
      const productId = product.product.id;
      const color = productColors[productId];
      return (
        <div key={productId} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedProducts.includes(productId)}
            onChange={() => handleProductSelect(productId)}
          />
          {color && (
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          <p>{product.product.name}</p>
        </div>
      );
    })}
  </div>
)}

<div className="md:w-[50%] w-full">
            <input
              type="number"
              value={selectedYear}
              onChange={handleYearChange}
              className="px-2 w-[70%] py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>

         
        </div>
      </div>


        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
            barCategoryGap={50}
            barGap={15}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedProducts.map((productId) => {
              const product = data.bestSellingProducts.find(
                (p) => p.product.id === productId
              );
              return (
                <Bar
                  key={productId}
                  dataKey={product.product.name}
                  fill={productColors[productId]}
                  barSize={15}
                  radius={[10, 10, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            disabled={currentRange.start === 0}
            className="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentRange.end === months.length}
            className="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
