
import React, { useState, useEffect } from 'react';

export default function UserActivity({ token, loading, error, orders, fetchOrders, expandedOrderId, handleProductClick }) {
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">User Activity</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleProductClick(order.id)}
              className="p-4 cursor-pointer"
            >
              <h4 className="text-md font-semibold mb-2">Product Details:</h4>
              <img
                src={order.product.image} // Add the image URL
                alt={order.product.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="text-sm text-gray-600 mb-1">{order.product.name}</p>

              {/* Details of the order that expand when clicked */}
              <div>
                <button className="text-[#F6944D] hover:text-[#F6944D] mt-2">
                  {/* You can add a toggle icon or text */}
                </button>

                {/* Show order details if expanded */}
                {expandedOrderId === order.id && (
                  <div className="mt-4">
                    <p>
                      <strong>Full Address:</strong> {order.fullAddress}
                    </p>
                    <p>
                      <strong>Price:</strong> {order.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Delivery Status:</strong> {order.deliveryStatus}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
