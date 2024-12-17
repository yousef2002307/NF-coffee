import React, { useState } from 'react';
import axios from 'axios';
import { Host } from '../../Api/Api';

export default function Delivery({ selectedProduct, quantity, closeModal }) {
  const [formData, setFormData] = useState({
  
   
    phone: '',
  
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); 
    const id = localStorage.getItem('UserId'); 
    if (!token) {
      console.error('No token found');
      return;
    }

    const orderData = {
      user_id:id , 
      product_id: selectedProduct.id,
      quantity,
      price: selectedProduct.price,
      phone: formData.phone,
      addressIndetail: formData.address,
    };

    try {
      const response = await axios.post(`${Host}/api/v1/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Order submitted successfully:', response.data.orderDetail);
      closeModal(); 
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gap-5 flex flex-col">
      <h1 className="text-black text-xl">Delivery</h1>

      
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Phone Number"
        required
      />

      <div className="flex gap-6">
       
      
      </div>

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Address"
        required
      />

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg font-semibold transition"
        >
          Submit Order
        </button>
      </div>
    </form>
  );
}
