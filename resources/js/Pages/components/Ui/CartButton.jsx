import React, { useState, useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartContext } from '../Context/CartContext'; // Make sure this path is correct
import ShoppingCart from '../Cart/ShoppingCart'; // Adjust the path if needed

const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { cartItems, cartItemCount } = useContext(CartContext);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center cursor-pointer "
        onClick={togglePopup}
      >
        <AiOutlineShoppingCart className="text-gray-800 md:text-[25px] text-[20px] hover:text-[#086169]" />
        
        {/* Cart Item Count Badge */}
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#086169] text-white md:text-xs text-sm font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Popup Cart */}
      {showPopup && (
        <div className="absolute top-10 right-0 md:w-[400px] w-[90%] z-10 bg-white shadow-lg rounded-lg">
          <ShoppingCart visibility={showPopup} onClose={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default Cart;
