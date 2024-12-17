import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Image from '../../assets/1.png'; 
import { Host } from "../../Api/Api";

export default function ProductSlider() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedButton, setSelectedButton] = useState("bestSelling");

  // Fetch products based on the button clicked
  const fetchProducts = async (endpoint, buttonName) => {
    try {
      const response = await axios.get(endpoint);
      if (response.data && response.data) {
        setProducts(response.data);
        setSelectedButton(buttonName);
      } else {
        console.error("No products found in the response");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(`${Host}/api/v1/bestsell`, "bestSelling");
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-10 text-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('productSlider.title')}</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => fetchProducts(`${Host}/api/v1/bestsell`, "bestSelling")}
          className={`md:px-4 md:py-2 px-1 py-1 border border-[#062B2F] md:text-[20px] hover:bg-[#062B2F] hover:text-white text-[12px] rounded-full ${selectedButton === "bestSelling" ? "bg-[#062B2F] text-white" : ""}`}
        >
          {t("productSlider.bestSelling")}
        </button>
        <button
          onClick={() => fetchProducts(`${Host}/api/v1/lastarrivals`, "newArrivals")} // Fetch New Arrivals
          className={`md:px-4 md:py-2 px-1 py-1 border border-[#062B2F] md:text-[20px] hover:bg-[#062B2F] hover:text-white  text-[12px] rounded-full ${selectedButton === "newArrivals" ? "bg-[#062B2F] text-white" : ""}`}
        >
          {t("productSlider.newArrivals")}
        </button>
        <button
          onClick={() => fetchProducts(`${Host}/api/v1/recommandation`, "recommendations")} // Fetch Recommendations
          className={`md:px-4 md:py-2 px-1 py-1 border border-[#062B2F] md:text-[20px]  hover:bg-[#062B2F] hover:text-white text-[12px] rounded-full ${selectedButton === "recommendations" ? "bg-[#062B2F] text-white" : ""}`}
        >
          {t("productSlider.recommendations")}
        </button>
      </div>
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="rounded-xl p-4 text-center">
                <img
                  src={product.image || Image} 
                  alt={product.name}
                  className="mx-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110 w-full h-52 object-cover"
                />
                <div className="flex justify-center mb-2">
                  {[...Array(product.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-800 font-semibold">{product.name}</p>
                <p className="text-teal-500 font-bold">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("productSlider.noProducts")}</p>
        )}
      </Slider>
    </div>
  );
}

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow`}
    style={{
      ...style,
      display: "flex",
      background: "black",
      color: "white",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#x27A1;
  </div>
);

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow`}
    style={{
      ...style,
      display: "flex",
      background: "black",
      color: "white",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#x27A0;
  </div>
);

