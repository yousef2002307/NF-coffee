import React, { useState, useEffect } from 'react';
import { BiEdit, BiEditAlt } from 'react-icons/bi';
import { Host } from '../../Api/Api';
import Logout from '../Login/Logout';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('userInfo');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {t , i18n}=useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });
  const [expandedOrderId, setExpandedOrderId] = useState(null); 
  const token = localStorage.getItem('token');


  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem('userData')) || {
      name: "",
      email:"",
      phone:"",
    };

    setFormData((prev) => ({
      ...prev,
      name: oldData.name,
      email: oldData.email,
      phone: oldData.phone,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log('Token:', token);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${Host}/api/v1/editprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
  
      const responseText = await response.text();

  
      if (response.ok) {
        try {
          const responseData = JSON.parse(responseText);
          console.log('Profile updated response:', responseData);
          toast.success('Profile updated successfully!');
        } catch (e) {
          toast.error('Error updating profile. Unexpected response format.');
         
        }
      } else {
        toast.error('Something went wrong while updating the profile.');
         
       
      }
    } catch (error) {
      toast.error('Something went wrong while updating the profile.');
   
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${Host}/api/v1/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data || []);
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || 'Failed to fetch orders.');
      }
    } catch (error) {
      toast.error('Something went wrong while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'userActivity') {
      fetchOrders();
    }
  }, [activeTab]);

  const handleProductClick = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId)); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  const isFormChanged = Object.keys(formData).some(
    (key) => formData[key] !== (localStorage.getItem(key) || '')
  );
  const isArabic = i18n.language === 'ar'; 

  return (
    <div className="flex items-start p-5 min-h-[60vh] justify-center">
      <div className="rounded-md p-6 w-full">
        <div className="flex flex-col gap-12 w-full justify-between md:flex-row">
          <div className="w-full md:w-1/4 border-r border-gray-200 pr-4">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('userInfo')}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  activeTab === 'userInfo' ? 'bg-[#F6944D] text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
              {t("User Information")}
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('userActivity')}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  activeTab === 'userActivity' ? 'bg-[#F6944D] text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
              {t("User Activity")}
              </button>
            </div>
            <div>
<Logout ju={`${isArabic? "text-right justify-end ":""}`}/>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start">
            {activeTab === 'userInfo' ? (
              <form onSubmit={handleUpdateProfile} className="w-full md:w-1/2">
                {['name', 'email', 'password', 'phone'].map((field) => (
                  <div key={field} className="mb-4">
                    <div className="flex items-center gap-2">
                      <input
                        type={field === 'password' ? 'password' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={t(`Enter your ${field}`)}
                        disabled={!editableFields[field]}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none`}
                      />
                      {!editableFields[field] ? (
                        <button
                          type="button"
                          onClick={() =>
                            setEditableFields((prev) => ({ ...prev, [field]: true }))
                          }
                          className="px-3 py-2  rounded-md"
                        >
                          <BiEditAlt />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setEditableFields((prev) => ({ ...prev, [field]: false }))
                          }
                          className="px-3 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F6944D] text-white rounded-md hover:bg-orange-600"
                    disabled={loading || !isFormChanged}
                  >
                    {loading ? `${t("Save..")}` : `${t("Save Changes")}`}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("Order Resent")}</h2>
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
                        <img
                          src={order.product.image} // Add the image URL
                          alt={order.product.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm text-gray-600 mb-1">{order.product.name}</p>
                        <button
                          className="text-[#F6944D] hover:text-[#F6944D] mt-2"
                          onClick={() => handleProductClick(order.id)}
                        >
                        </button>
                        {expandedOrderId === order.id && (
                          <div>
                            <div className="w-full">
                              <div className="w-full">
                              <p>
                                <strong>{t("Full Address:")}</strong> {order.addressIndetail}
                              </p>
                              <p>
                                <strong>{t("pr")}</strong> {order.price}
                              </p>
                              <p>
                                <strong>{t("quantity")}</strong> {order.quantity}
                              </p>
                            </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
