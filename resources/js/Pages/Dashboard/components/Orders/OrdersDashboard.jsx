import React, { useEffect, useState } from 'react';
import { Host } from '../../../Api/Api';
import { useNavigate } from 'react-router-dom';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [statusFilter, setStatusFilter] = useState(''); // Track filter status

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]); // Refetch orders when the filter changes

  const handleOrderClick = (orderId, status) => {
    navigate(`/dashboard/order/${orderId}`, { state: { status } });
  };
  

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${Host}/api/v1/allorders?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(orders.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get the range of pages to display (3 pages only)
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);
  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // Filter orders based on selected status
  const filteredOrders = statusFilter
    ? orders.filter(order => order.status?.toLowerCase() === statusFilter.toLowerCase())
    : orders;

  // Slice orders to display only for the current page
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 min-h-screen">
      {/* Header: Filter */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="shipped">Shipped</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center font-medium text-gray-600">User</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Product</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Quantity</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Address</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Phone</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Payment</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <tr className="border-b hover:bg-gray-50" onClick={() => handleOrderClick(order.id)}  key={order.id}>
                <td className="p-2 text-center">{order.user_id}</td>
                <td className="py-3 px-4 text-center text-gray-800">{order.product?.name}</td>
                <td className="py-3 px-4 text-center text-gray-800">{order.quantity}</td>
                <td   className="py-3 px-4 text-center font-medium text-gray-600 truncate" 
  style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>{order.addressIndetail}</td>
                <td className="py-3 px-4 text-center text-gray-800">{order.phone}</td>
                <td className="py-3 px-4 text-center text-gray-800">{order.price}</td>
                <td className="py-3 px-4 text-center text-gray-800">{order.created_at}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status?.trim().toLowerCase() === 'processing'
                        ? 'bg-yellow-200 text-yellow-700'
                        : order.status?.trim().toLowerCase() === 'completed'
                        ? 'bg-green-200 text-green-700'
                        : order.status?.trim().toLowerCase() === 'shipped'
                        ? 'bg-blue-200 text-blue-700'
                        : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {order.status?.toUpperCase()} {/* Make status uppercase */}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm">
          Showing page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </button>
          {pagesToShow.map((page) => (
            <button
              key={page}
              className={`p-2 rounded ${
                currentPage === page
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
