import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // useLocation for accessing passed state
import { Host } from '../../../Api/Api';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Access passed status
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(location.state?.status || null); // Use location.state?.status if passed
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${Host}/api/v1/specificorder/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the API response to check the status
        setOrder(data[0]);
        
        // If status is not set from location state, update from API response
        if (status === null) {
          setStatus(data[0]?.status);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId, status]); // Ensure status changes are handled

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${Host}/api/v1/orderstatus/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus); // Update status locally
      toast.success('Order status updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${Host}/api/v1/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Order deleted successfully!');
      navigate('/dashboard/ordersDashboard');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const confirmDelete = () => {
    setDeleteModalOpen(true); // Show the modal when delete button is clicked
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false); // Close the modal when cancel is clicked
  };

  if (!order || status === null) return <div>Loading...</div>;
  const hasLocation = order.lan && order.lon;
  const mapLink = hasLocation
    ? `https://www.google.com/maps?q=${order.lan},${order.lon}`
    : null;
  return (
    <div className="p-6 min-h-screen ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Details</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-center items-center m-auto mb-5"><img src={order.product?.image}></img></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 m-auto justify-between items-center w-full gap-5">
          
          <div className='flex flex-col gap-3'>
        
            <p className="text-lg font-medium text-gray-700"><strong>Product:</strong> {order.product?.name}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Quantity:</strong> {order.quantity}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Address:</strong> {order.addressIndetail}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Phone:</strong> {order.phone}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Payment:</strong> {order.price}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          </div>

          <div className='flex flex-col gap-3  '>
            <p className="text-lg font-medium text-gray-700"><strong>Status:</strong></p>
            <div className="mt-2 ">
  <span
    className={`px-4 py-2 text-sm font-semibold rounded-full inline-block ${
      status === 0 ? 'bg-yellow-100 text-yellow-700' :
      status === 1 ? 'bg-green-100 text-green-700' :
      status === 2 ? 'bg-blue-100 text-blue-700' :
      status === 3 ? 'bg-red-100 text-red-700' :
      status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
      status === 'completed' ? 'bg-green-100 text-green-700' :
      status === 'shipped' ? 'bg-blue-100 text-blue-700' :
      status === 'canceled' ? 'bg-red-100 text-red-700' :
      'bg-gray-100 text-gray-700'
    }`}
  >
    {status === 0 ? 'Processing' :
      status === 1 ? 'Completed' :
      status === 2 ? 'Shipped' :
      status === 3 ? 'Canceled' :
      status === 'processing' ? 'Processing' :
      status === 'completed' ? 'Completed' :
      status === 'shipped' ? 'Shipped' :
      status === 'canceled' ? 'Canceled' :
      'Unknown'}
  </span>
</div>
{mapLink && (
              <div className="mt-4">
                <p className="text-lg font-medium text-gray-700"><strong>Location:</strong></p>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View on Google Maps
                </a>
              </div>
            )}

          </div>
          
        </div>

        {/* Dropdown to select status */}
        <div className="mt-6 w-1/3">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Order Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => updateStatus(parseInt(e.target.value))}
            className="mt-2 block w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="0">Processing</option>
            <option value="1">Completed</option>
            <option value="2">Shipped</option>
            <option value="3">Canceled</option>
          </select>
        </div>

        {/* Delete Button */}
        <div className="mt-6">
          <button
            onClick={confirmDelete}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
          >
            Delete Order
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-medium text-gray-700">Are you sure you want to delete this order?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
