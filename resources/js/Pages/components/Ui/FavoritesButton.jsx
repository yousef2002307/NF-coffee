import React, { useContext, useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import FavoritesPopup from "../Favorites/Favorites";
import { FavoritesContext } from "../Context/FavoritesContext";

const FavoritesButton = () => {
  const { favorites } = useContext(FavoritesContext);
  const [showPopup, setShowPopup] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    // Update the favorites count whenever the favorites state changes
    const count = favorites.filter(fav => fav.product).length;
    setFavoritesCount(count);
  }, [favorites]); // This effect runs whenever the 'favorites' array changes

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="relative flex items-center cursor-pointer" onClick={togglePopup}>
      <IoMdHeartEmpty className="text-gray-800 md:text-[25px] text-[20px]" />
      {favoritesCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#086169] text-white md:text-xs text-sm font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
          {favoritesCount}
        </span>
      )}
      {showPopup && (
        <FavoritesPopup visibility={showPopup} onClose={togglePopup} />
      )}
    </div>
  );
};

export default FavoritesButton;
