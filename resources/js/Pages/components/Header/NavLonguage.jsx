import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function NavLonguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  return (
    <div>
      <nav className="  bg-[#F2E9E0] flex justify-between items-center">
        <div className="relative container p-2">
          <button 
            onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
            className="text-black  focus:outline-none flex items-center space-x-2"
          >
            {language === "ar" ? (
              <div className="flex justify-center items-center gap-2">
                <span className="fi fi-us w-10  h-10"></span>
                <span>English</span>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <span className="fi fi-eg w-10  h-10"></span>
                <span>العربية</span>
              </div>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
