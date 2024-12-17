import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FavoritesContext } from "../Context/FavoritesContext";
import { ProductsContext } from "../Context/ProductsContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Productssections = () => {
  const { products, loading, error, page, goToNextPage, goToPreviousPage } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { t , i18n} = useTranslation();
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isArabic = i18n.language === 'ar'; 

  const [favoritesState, setFavoritesState] = useState({});

  useEffect(() => {
    const favoritesMap = {};
    favorites.forEach((fav) => {
      if (fav.product && fav.product.id) {
        favoritesMap[fav.product.id] = fav.id; // Map product.id to favorite.id
      }
    });
    setFavoritesState(favoritesMap);
  }, [favorites]);

  const handleFavoriteToggle = (product) => {
    const favoriteId = favoritesState[product.id];
    if (favoriteId) {
      removeFromFavorites(favoriteId); 
    } else {
      addToFavorites(product.id);
    }

    setFavoritesState((prevState) => {
      const updatedState = { ...prevState };
      if (favoriteId) {
        delete updatedState[product.id]; 
      } else {
        updatedState[product.id] = true; 
      }
      return updatedState;
    });
  };
  const getCategoryName = (product) => {
    return i18n.language === "ar" ? product.name_ar : product.name;  
  };
  
  return (
    <div className="container mx-auto py-8">
    <h1 className={`text-3xl font-semibold ${isArabic ? "text-right":"text-left"} mb-8`}>{t("Suggestions")}</h1>


      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
            {products.length > 0 ? (
              products.slice(0,4).map((product) => (
                <div key={product.id} className="bg-white shadow-lg flex flex-col gap-3 rounded-lg p-4">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <div className="mt-4 text-center">
                      <h2 className="text-xl font-medium">{getCategoryName(product)}</h2>
                      <p className="text-lg font-bold text-[#086169] mt-4">L.E{product.price}</p>
                    </div>
                  </Link>
                  <div className="mt-4 flex gap-5">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 text-white p-2 rounded-lg w-full"
                    >
                      {t("cart")}
                    </button>
                    <button
                      onClick={() => handleFavoriteToggle(product)}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        favoritesState[product.id] ? "bg-red-500 text-white" : "bg-orange-200"
                      }`}
                    >
                      {favoritesState[product.id] ? <IoMdHeart size={30} /> : <IoMdHeartEmpty size={30} />}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No products available.</div>
            )}
          </div>

          
        </div>
      )}
    </div>
  );
};

export default Productssections;
