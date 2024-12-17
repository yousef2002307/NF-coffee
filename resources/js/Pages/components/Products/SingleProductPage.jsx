import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../Context/ProductsContext';
import { CartContext } from '../Context/CartContext';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Order from '../Order/Order';
import Productssections from './Prodectssection';

const SingleProductPage = () => {
  const { productId } = useParams();

  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
 
  const { t , i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProduct = products.find((product) => product.id === parseInt(productId));

  if (!selectedProduct) {
    return <div className="text-center">Product not found.</div>;
  }

  const averageRating = selectedProduct.ratings.length
    ? selectedProduct.ratings.reduce((sum, rating) => sum + rating.rating, 0) / selectedProduct.ratings.length
    : 0;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const getCategoryName = (selectedProduct) => {
    return i18n.language === "ar" ? selectedProduct.name_ar : selectedProduct.name;  
  };
  const getCategorydec = (selectedProduct) => {
    return i18n.language === "ar" ? selectedProduct.desc_ar : selectedProduct.description;  
  };
 
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row h-full justify-around items-center gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={selectedProduct.image_url}
            alt={selectedProduct.name}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-8 w-full md:w-1/2">
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-semibold text-[#6B4226]">{getCategoryName(selectedProduct)}</h2>
            <div className="flex items-center gap-2 text-[#086169] text-xl">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }, (_, index) => (
                  index < Math.round(averageRating) ? (
                    <AiFillStar key={index} size={20} />
                  ) : (
                    <AiOutlineStar key={index} size={20} />
                  )
                ))}
              </div>
              <span className="text-sm text-gray-500 hover:underline cursor-pointer">
                {selectedProduct.ratings.length} reviews
              </span>
            </div>
            <p className="text-xl font-bold text-[#086169]">L.E {selectedProduct.price}</p>
          </div>
          <p className="text-gray-700">{getCategorydec(selectedProduct)}</p>
          <p className="text-3xl font-bold text-[#086169]">L.E {selectedProduct.price}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <button onClick={decreaseQuantity} className="text-2xl px-2 border rounded-full">-</button>
              <span className="text-xl">{quantity}</span>
              <button onClick={increaseQuantity} className="text-2xl px-2 border rounded-full">+</button>
            </div>
            <button
              onClick={() => addToCart(selectedProduct, quantity)}
              className="bg-orange-500 text-white px-6 rounded-lg"
            >
              {t("cart")}
            </button>
            <button
              onClick={openModal}
              className="border border-orange-500 text-orange-500 px-6 rounded-lg"
            >
              {t("btn")}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Order
          selectedProduct={selectedProduct}
          quantity={quantity}
          closeModal={closeModal}
        />
      )}
      <Productssections/>
    </div>
  );
};

export default SingleProductPage;
