import React from "react";
import Imag from '../../assets/3.png'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function NewItem() {
  const { i18n , t } = useTranslation();
  const isRTL = i18n.language === "ar"; 

  return (
    <div className=" relative flex flex-col my-10 gap-5 md:flex-row items-center justify-around  bg-white">

<div className="flex container flex-col justify-center w-full gap-5 md:w-[30%] p-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('new_item.title')}</h2>
      <div className="w-20 h-1 bg-gray-800 mb-4"></div>
      <p className="text-gray-600 mb-4">
        {t('new_item.description')}{" "}
        <span className="font-semibold">{t('new_item.flavor')}</span>!
      </p>
      <p className="text-teal-600 font-semibold text-lg mb-6">
        {t('new_item.details')}
      </p>
      <Link to="/products" className="px-6 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 w-full md:w-[30%] hover:text-white transition"> 
        {t('new_item.order_now')}
      </Link>
    
    </div>
      <div className="  flex justify-end w-full  md:w-1/2 ">
     
      <img
          src={Imag}
          alt="Frappuccino"
          className={`rounded-lg object-cover w-[85%] ${
            isRTL ? "transform scale-x-[-1]" : ""
          }`}
        />
    
      </div>
    </div>
  );
}

export default NewItem;
