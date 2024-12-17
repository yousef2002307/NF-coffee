import React, { useState, useEffect } from "react";
import { fetchCategories, fetchProductsByCategory } from "../../Api/Api";
import Image from "../../assets/m.png"; 
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
const {t , i18n}=useTranslation()

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        if (categories.length > 0) {
          const firstCategoryId = categories[0].id;
          const products = await fetchProductsByCategory(firstCategoryId);
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error("Error loading categories or products:", error);
      }
    };

    loadCategoriesAndProducts();
  }, []);

  const filterProductsByCategory = async (categoryId) => {
    try {
      const products = await fetchProductsByCategory(categoryId);
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-yellow-400" />)}
        {Array(halfStars).fill(<FaStarHalfAlt className="text-yellow-400" />)}
        {Array(emptyStars).fill(<FaRegStar className="text-yellow-400" />)}
      </>
    );
  };
  const getMenuNameid = (category) => {
    return category ? (i18n.language === "ar" ? category.namear : category.name) : "";
  };
  const getMenuName = (product) => {
    return product ? (i18n.language === "ar" ? product.namear : product.name) : "";
  };
  return (
    <div className="bg-gray-100">

<div className="bg-white shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300 p-4 flex justify-center">
  {/* Dropdown for small screens and categories for larger screens */}
  <div className="w-full sm:w-auto">
    {/* Dropdown on small screens */}
    <select
      className="w-full sm:hidden p-4 text-[#260806] bg-white border rounded-md"
      onChange={(e) => filterProductsByCategory(e.target.value)}
    >
      <option value="" disabled selected>{t("Select a category")}</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
         {getMenuNameid(category)}
        </option>
      ))}
    </select>

  
    <div className="hidden sm:flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 flex items-center text-center cursor-pointer"
          onClick={() => filterProductsByCategory(category.id)}
        >
          <p className="text-[15px] text-[#260806] font-semibold">
          {getMenuNameid(category)}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>



     
      <div className="container m-7 p-5">
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-3 gap-24">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-center items-center gap-5"
              >
                <div>
                  <img
                    src={ product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="flex gap-1">
                    {getStarRating(product.rating || 5)}
                  </div>
                  <h3 className="text-lg font-semibold">  {getMenuName(product)}</h3>
                  <p className="text-2xl font-bold text-[#086169]">L.E {product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Found Products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
