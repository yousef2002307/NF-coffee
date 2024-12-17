import React from "react";

function TopSales({ bestSellingThisYear, bestSellingThisMonth, activeTab, setActiveTab }) {
  return (
    <div className="flex md:flex-row  flex-col gap-6">
      <div className="w-full">
        {/* Yearly Top Sales */}
        {activeTab === "Yearly" && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Yearly Top Sales</h2>
            <ul className="space-y-2">
              {bestSellingThisYear.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="w-[50%] flex gap-5">
                    <img className="w-[25%]" src={item.product.image} alt={item.product.name} />
                    <span>{item.product.name}</span>
                  </div>
                  <span className="font-bold">LE {item.product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Monthly Top Sales */}
        {activeTab === "Monthly" && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Monthly Top Sales</h2>
            <ul className="space-y-2">
              {bestSellingThisMonth.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="w-[50%] flex gap-5">
                    <img className="w-[25%]" src={item.product.image} alt={item.product.name} />
                    <span>{item.product.name}</span>
                  </div>
                  <span className="font-bold">LE {item.product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-4 mb-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Yearly" ? "bg-orange-600 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Yearly")}
        >
          Yearly
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Monthly" ? "bg-orange-600 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Monthly")}
        >
          Monthly
        </button>
      </div>
    </div>
  );
}

export default TopSales;
