import React from 'react';
import Logo from '../Ui/Logo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsSendArrowUp, BsTiktok } from 'react-icons/bs';

export default function Footer() {
  const { t , i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; 

  return (
    <div className="bg-[#062B2F] py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 px-4 md:px-8">
        {/* Subscription Section */}
        <div className="flex flex-col gap-5 ">
          <p className="text-white text-lg">{t("footer.subscribe")}</p>
          <div className="flex bg-[#0A373C] md:w-[80%] rounded-xl items-start justify-start relative w-full">
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              className="py-3 bg-[#0A373C]  px-3 pl-10 rounded-xl  text-white placeholder-gray-400  w-full sm:w-auto"
            />
            <BsSendArrowUp className={`absolute ${isArabic ? 'left-1' : 'right-10' } top-1/2 transform -translate-y-1/2 text-[#F6944D] text-lg cursor-pointer`} />
         
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-lg">{t("footer.followUs")}</p>
            <div className="flex gap-4">
              <Link
                to="https://www.facebook.com/coffeepointeg/"
                target="_blank"
                className="text-white p-2 rounded-full bg-[#F6944D]"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                to="https://tiktok.com/@coffeepoint.eg"
                target="_blank"
                className="text-white p-2 rounded-full bg-[#F6944D]"
              >
                <BsTiktok className="h-5 w-5" />
              </Link>
              <Link
                to="https://www.instagram.com/coffeepointeg"
                target="_blank"
                className="text-white p-2 rounded-full bg-[#F6944D]"
              >
                 <FaInstagram className="h-5 w-5" />
               
              </Link>
            </div>
          </div>
        </div>

        {/* Pages Links Section */}
        <div className="flex flex-col gap-1 items-start md:items-start w-full justify-start text-left">
          <p className="text-[#577260] text-lg">{t("footer.pages")}</p>
          <Link to="/" className="text-white">
            {t("home")}
          </Link>
          <Link to="/about" className="text-white">
            {t("about")}
          </Link>
          <Link to="/menu" className="text-white">
            {t("menu")}
          </Link>
          <Link to="/products" className="text-white">
            {t("shop")}
          </Link>
          <Link to="/blogs" className="text-white">
            {t("blogs")}
          </Link>
          <Link to="/contactUs" className="text-white">
            {t("contactUs")}
          </Link>
        </div>

        {/* Logo & Terms Section */}
        <div className="flex flex-col gap-4 items-start  text-left">
          <Logo top="top-0" w="w-[120px] md:w-[150px]" h="h-[120px] md:h-[150px]" />
          <div>
           <Link to='/PrivacyPolicy'><p className="text-white">{t("footer.termsConditions")}</p></Link> 
           <Link to="/TermsAndConditions"> <p className="text-white">{t("footer.privacyPolicy")}</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
