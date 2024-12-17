import React, { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CgClose } from "react-icons/cg";
import { Host } from "../../Api/Api";

const ShoppingCart = ({ visibility, onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { t , i18n } = useTranslation();

  const [phone, setPhone] = useState('');
  const [addressIndetail, setAddressIndetail] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [showPopup, setShowPopup] = useState(false); 
  const [orderSuccess, setOrderSuccess] = useState(false); 



  const handleShowAll = () => {
   
    setShowPopup(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        `${Host}/api/v1/orderal`,
        {
          phone,
          addressIndetail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      );

      setOrderSuccess(true);  
    
      setShowPopup(false); 
      clearCart(); 
    } catch (error) {
      
     
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    if (item.product) {
      return total + item.quantity * item.product.price;
    }
    return total;
  }, 0);
  const getCategoryName = (item) => {
    return i18n.language === "ar" ? item.product.name_ar : item.product.name;  
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        ref={popupRef}
        className={`h-full bg-white shadow-lg transition-transform duration-300 ${visibility ? "translate-x-0" : "translate-x-full"} w-full md:w-[400px]`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t('shoppingcart')}</h2>
          <button
            onClick={onClose} // Close the cart on click
            className="text-gray-500 text-2xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">{t('your_cart_is_empty')}</p>
          ) : (
            cartItems.map((item) => {
              if (!item.product) return null;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 border-b "
                >
                  <div className="w-1/2">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-[80%] h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <p className="text-black "> L.E{item.product.price}</p>
                    <p className="text-black">{getCategoryName(item)}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 text-black border-black border rounded-full"
                      >
                        -
                      </button>
                      <p className="text-black text-lg">{item.quantity}</p>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 text-black border-black border rounded-full"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#577260] text-[12px] hover:text-red-500"
                      >
                        {t('removed')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 relative top-0 border-t">
          {cartItems.length > 0 && !showForm && (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">{t('Sub total:')}</span>
                <span className="font-semibold text-[#086169]">L.E{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleShowAll}
                className="w-full bg-[#F6944D] text-white py-2 rounded-md font-semibold"
              >
                {t('Submit Order')}
              </button>
            </>
          )}
        </div>
      </div>

      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60" onClick={(e) => e.stopPropagation()}>
    <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
   <div className="flex justify-between ">
   
      <h3 className="text-lg font-semibold mb-4">{t('order_details')}</h3>
      <button
          type="button"
          onClick={() => setShowPopup(false)}
          className=""
        >
        <CgClose/>
        </button>
   </div>

      
      {/* Display product details in the popup */}
     <div className="flex  gap-5 justify-between ">
    

      {/* Form fields */}
      <form onSubmit={handleSubmit} className=" flex flex-col gap-5 w-1/2" onClick={(e) => e.stopPropagation()}>
        <div>
          
          <input
            type="text"
            placeholder="Phone Number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="">
        
          <input
          placeholder="Address"
            type="text"
            id="addressIndetail"
            value={addressIndetail}
            onChange={(e) => setAddressIndetail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Display total price */}
        <div className="flex flex-col gap-2">
           <button type="submit" className="w-full bg-[#F6944D] text-white py-2 rounded-md font-semibold">
           {t('Submit Order')}
        </button>
       
        </div>
       
      </form>
      <div className="w-1/2">
        {cartItems.map((item) => {
          if (!item.product) return null;
          return (
            <div key={item.id} className="flex justify-between items-center">
              
              <div className="w-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
              <p>{t("Sub total:")}</p>
              <p className="text-black text-lg"> L.E {item.product.price}</p>
              </div>
                
                <div className="flex justify-between items-center mb-4">
                  <p className="text-black text-lg">{t("quantity")}</p>
                <p className="text-black text-lg">{item.quantity}</p>
                </div>
                
              </div>
              
            </div>
          );
        })}
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">{t("Sub total:")}</span>
          <span className="font-semibold text-[#086169]">L.E{totalPrice.toFixed(2)}</span>
        </div>
      </div>
     </div>
    </div>
  </div>
)}

      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">{t('order success')}</h3>
            <p>{t('thank you fory our order')}</p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="mt-4 bg-[#F6944D] text-white py-2 px-6 rounded-md"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
