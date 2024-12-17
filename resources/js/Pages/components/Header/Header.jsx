import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartButton from "../Ui/CartButton";
import FavoritesButton from "../Ui/FavoritesButton";
import Logo from "../Ui/Logo";
import UserButton from "../Login/LoginButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { t } = useTranslation();

  useEffect(() => {

    const token = localStorage.getItem("token");
  
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl container m-0 px-2 py-2 flex items-center justify-between">
        <Logo top="top-0" />

        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-gray-800 hover:text-[#086169]">
            {t("home")}
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-[#086169]">
            {t("about")}
          </Link>
          <Link to="/menu" className="text-gray-800 hover:text-[#086169]">
            {t("menu")}
          </Link>
          <Link to="/products" className="text-gray-800 hover:text-[#086169]">
            {t("shop")}
          </Link>
          <Link to="/blog" className="text-gray-800 hover:text-[#086169]">
            {t("blogs")}
          </Link>
          <Link to="/contactUs" className="text-gray-800 hover:text-[#086169]">
            {t("contactUs")}
          </Link>
        </nav>

        <div className="flex items-center gap-8">
      
          {isLoggedIn && <FavoritesButton />}
          
          <div className="relative">
            <UserButton />
          </div>

          {isLoggedIn && <CartButton />}
        </div>

        <button
          className="md:hidden text-gray-800 hover:text-blue-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center gap-8 py-4">
            <Link to="/" className="text-gray-800 hover:text-[#086169]">
              {t("home")}
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-[#086169]">
              {t("about")}
            </Link>
            <Link to="/menu" className="text-gray-800 hover:text-[#086169]">
              {t("menu")}
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-[#086169]">
              {t("shop")}
            </Link>
            <Link to="/blog" className="text-gray-800 hover:text-[#086169]">
              {t("blogs")}
            </Link>
            <Link to="/contactUs" className="text-gray-800 hover:text-[#086169]">
              {t("contactUs")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
