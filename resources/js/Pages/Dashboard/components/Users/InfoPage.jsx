import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Host } from "../../../Api/Api";

function InfoPage() {
  const { id } = useParams();  
  const [userData, setUserData] = useState({
    orders: [],
    favouriteItems: [],
    cartItems: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${Host}/api/v1/usercof/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          orders: data.orders,
          favouriteItems: data.favoriteItems,
          cartItems: data.cartItems,
          total: data["count of orders user made"],
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);  

  return (
    <div className="min-h-screen bg-[#f5ebe5] p-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-8">
        <input
          type="text"
          placeholder="Search here"
          className="border rounded-lg p-2 w-full md:w-1/3 shadow-sm focus:ring-2 focus:ring-green-400"
        />
        <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/3">
          <p className="text-orange-500 text-xl">{userData.total}</p>
          <p className="font-bold">Total Orders</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-8 p-4">
        <h2 className="text-xl font-bold mb-4">Orders History</h2>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Code</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Product Price</th>
             
            </tr>
          </thead>
          <tbody>
            {userData.orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{order.product_id}</td>
                <td className="p-2">{order.product.name}</td>
                <td className="p-2">{order.created_at}</td>
                <td className="p-2">{order.product.price}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white w-full md:w-1/3 shadow-lg rounded-lg p-6 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Favourites</h2>
          <ul>
            {userData.favouriteItems.map((item) => (
              <li key={item.index} className="flex items-center mb-2">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span>{item.product.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white w-full md:w-1/3 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          <ul>
            {userData.cartItems.map((item) => (
              <li key={item.id} className="flex items-center mb-2">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span>{item.product.name}</span> - {item.quantity} x LE {item.product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
