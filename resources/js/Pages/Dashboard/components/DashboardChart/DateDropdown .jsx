import { useState, useEffect } from "react";

const formatDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("en-US", { month: "long" });
  return `${day < 10 ? `${day}` : day} ${month}`;
};

const DateDropdown = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7); 
    return today.toISOString().split('T')[0]; 
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getEndDate = (startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    return formatDate(date);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onDateChange(e.target.value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center relative">
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 bg-[#F7DCE1] transition-all duration-300"
      >
        <p className="text-base sm:text-lg font-semibold">
          {formatDate(selectedDate)}
        </p>
        <span className="text-sm"> - </span>
        <p className="text-base sm:text-lg font-semibold">
          {getEndDate(selectedDate)}
        </p>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 bg-[#F7DCE1] rounded-lg shadow-lg mt-2 p-4 w-full sm:w-auto">
          <label className="block">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
