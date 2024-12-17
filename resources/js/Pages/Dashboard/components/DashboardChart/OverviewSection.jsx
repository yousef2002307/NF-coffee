import React from "react";
import Ch1 from "../../../assets/ch.png";
import Ch2 from "../../../assets/ch2.png";
import Ch3 from "../../../assets/ch3.png";

const Overview = ({ data }) => {
  return (
    <div className="bg-white p-6 sm:p-8 flex flex-col gap-6 sm:gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl sm:text-2xl lg:text-3xl">{data.productCount}</p>
            <p className="text-sm lg:text-base font-semibold">Total number of products</p>
          </div>
          <div>
            <img className="w-12 sm:w-16 lg:w-20" src={Ch1} alt="Chart 1" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl sm:text-2xl lg:text-3xl">{data.visitorsCount}</p>
            <p className="text-sm lg:text-base font-semibold">Number of visitors</p>
          </div>
          <div>
            <img className="w-12 sm:w-16 lg:w-20" src={Ch2} alt="Chart 2" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl sm:text-2xl lg:text-3xl">{data.salesCount}</p>
            <p className="text-sm lg:text-base font-semibold">Sales for the month</p>
          </div>
          <div>
            <img className="w-12 sm:w-16 lg:w-20" src={Ch3} alt="Chart 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
