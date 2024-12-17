import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BsTiktok } from "react-icons/bs";
import Logo from "../Ui/Logo";

const BottomNav = () => {
  const { t } = useTranslation();
  const [showFooter, setShowFooter] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFooter(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div
  className={`fixed bottom-0 left-0 right-0 bg-[#062B2F] shadow-lg transition-transform duration-300 z-50 ${
    showFooter ? "translate-y-0" : "translate-y-52"
  } h-11 md:h-auto`}
>
  <div className="max-w-screen-xl mx-auto px-4 flex gap-10 flex-row md:justify-between justify-center items-center">
    {/* Call Section */}
    <div className="flex flex-row justify-center items-center gap-4">
      <Link to="/" className="text-[#F6944D] text-sm md:text-lg font-semibold">
        <h1>{t("call")}</h1>
      </Link>
    </div>

    {/* Logo Section */}
    <div className="flex justify-center items-center">
      <Logo w="w-full" h="h-full" />
    </div>

    {/* Social Links */}
    <div className="flex justify-center items-center gap-4">
      <Link
        to="https://www.facebook.com"
        target="_blank"
        className="text-white p-2 rounded-full bg-[#F6944D]"
      >
        <FaFacebook className="md:h-5 h-3 w-3  md:w-5" />
      </Link>
      <Link
        to="https://www.instagram.com"
        target="_blank"
        className="text-white p-2 rounded-full bg-[#F6944D]"
      >
        <FaInstagram className="md:h-5 h-3 w-3  md:w-5" />
      </Link>
      <Link
        to="https://www.tiktok.com"
        target="_blank"
        className="text-white p-2 rounded-full bg-[#F6944D]"
      >
        <BsTiktok className="md:h-5 h-3 w-3  md:w-5"/>
      </Link>
    </div>
  </div>
</div>


      {/* Footer Ref for Intersection Observer */}
      <div ref={footerRef} className="footer h-1"></div>
    </>
  );
};

export default BottomNav;
