import React, { createContext, useState, useEffect } from "react";
import { Host } from "../../Api/Api";
import { toast } from "react-toastify";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${Host}/api/v1/fav`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const validFavorites = data.filter((fav) => fav.product && fav.product.id);
        setFavorites(validFavorites);
      } else if (response.status === 404) {
       
        console.warn("No favorite products found");
        setFavorites([]); 
      } else {
        const errorResponse = await response.json();
        console.error("Failed to fetch favorites:", errorResponse.message || response.statusText);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    }
  };
  


  const addToFavorites = async (productId) => {
    try {
      const response = await fetch(`${Host}/api/v1/fav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        const newFavorite = await response.json();
       
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        toast.success("Add Fevoritive Product")
        console.log("Favorite added successfully:", newFavorite);

     
        fetchFavorites();
      } else {
        const errorResponse = await response.json();
        console.error("Failed to add favorite:", errorResponse.message || response.statusText);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

const removeFromFavorites = async (favoriteId) => {
  try {
      const response = await fetch(`${Host}/api/v1/fav/${favoriteId}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.ok) {
      
          setFavorites((prevFavorites) =>
              prevFavorites.filter((fav) => fav.id !== favoriteId)
          );
          toast.success("removed Fevoritive Product")
      } else {
          const errorResponse = await response.json();
          console.error("Failed to remove favorite:", errorResponse.message || response.statusText);
      }
  } catch (error) {
      console.error("Error removing favorite:", error.message);
  }
};


  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      console.error("No user token found. Please log in.");
    }
  }, [token]); 

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
