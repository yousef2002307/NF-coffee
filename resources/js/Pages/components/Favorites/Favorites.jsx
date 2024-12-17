import React, { useContext, useRef } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FavoritesPopup({ visibility, onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

const { t, i18n } = useTranslation();

  const handleShowAll = () => {
    navigate("/favorites", { state: { favorites } }); 
    onClose();
  };
  const getCategoryName = (product) => {
    return i18n.language === "ar" ? product.name_ar : product.name;  
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        ref={popupRef}
        className={`h-full bg-white shadow-lg transition-transform duration-300 ${
          visibility ? "translate-x-0" : "translate-x-full"
        } w-full md:w-[400px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t("Favorites")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-2xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {favorites.length === 0 ? (
            <p className="text-gray-500">{t("Your favorites list is empty")}</p>
          ) : (
            favorites.map((favorite) => {
              const product = favorite.product;
              return (
                <div
                  key={favorite.id}
                  className="flex items-center justify-between p-2 border-b space-x-4"
                >
                  <img className="w-12 h-12 rounded-md" src={product.image_url} alt={product.name} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{getCategoryName(product)}</h3>
                    <p className="text-gray-500 text-sm">{product.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(favorite.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t">
          {favorites.length > 0 && (
            <button
              onClick={handleShowAll}
              className="w-full bg-[#086169] text-white py-2 rounded-md font-semibold"
            >
             {t ("Show All Favorites")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPopup;
