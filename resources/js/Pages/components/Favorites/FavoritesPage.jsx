import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { CartContext } from "../Context/CartContext";
import { FavoritesContext } from "../Context/FavoritesContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const { removeFromFavorites } = useContext(FavoritesContext); 
const {t}=useTranslation()

  useEffect(() => {
    if (favorites.length === 0) {
      navigate("/");
    }
  }, [favorites, navigate]);

  return (
    <div className="favorites-page px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{t("Your Favorites")}</h1>

      {favorites.length === 0 ? (
        <div className="text-center text-lg text-gray-500">{t("Your favorites list is empty")}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => {
            const product = favorite.product;
            return (
              <div key={favorite.id} className="bg-white shadow-md rounded-lg overflow-hidden group">
                <img
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.image_url}
                  alt={product.name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                 <div className="flex gap-2">
                 <button
                    onClick={() => addToCart(product)} 
               className="bg-orange-500 text-white p-2 rounded-lg w-full"
                  >
                 {t("cart")}
                  </button>
                  
                  <button
                    onClick={() => removeFromFavorites(favorite.id)} 
                    className={`p-2 rounded-lg transition-colors duration-300 
                    bg-[#086169]
                    `}
                  >
                  <IoMdHeartEmpty className="text-white" size={30} />
                  </button>
                 </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
