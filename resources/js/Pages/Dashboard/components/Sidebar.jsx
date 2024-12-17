import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../components/Ui/Logo";
import { MdOutlineShoppingBag, MdWeb } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscStarEmpty } from "react-icons/vsc";
import { BiUser } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { TbActivityHeartbeat, TbMoneybag } from "react-icons/tb";
import { GrBlockQuote } from "react-icons/gr";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(Number(storedRole));
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderNavLink = (to, Icon, label) => {
    const isActive = location.pathname === to;
    return (
      <li className="w-full flex justify-center items-center">
        <NavLink
          to={to}
          className={`flex items-center gap-2 w-full p-3 rounded-tr-2xl rounded-br-2xl ${
            isActive ? "bg-orange-500 text-white" : "text-[#717579]"
          }`}
        >
          <Icon size={30} className="text-inherit" />
          <span className="font-medium">{label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      <button
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-md"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <aside
        className={`bg-[#F3ECE6] h-full fixed z-50 lg:static transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 shadow-md`}
      >
        <div className="mt-5 p-5 flex-col flex justify-start items-center">
          <Logo />
        </div>

        <nav className="flex flex-col w-full p-2 justify-center gap-5 items-start text-center">
          <p className="ml-5">Main Menu</p>
          <ul className="flex flex-col items-center gap-1 w-full">
          
        

            {role === 1 && (
              <>
                {renderNavLink("/dashboard", MdWeb, "Dashboard")}
                {renderNavLink("/dashboard/categories", RxDashboard, "Categories")}
                {renderNavLink("/dashboard/bestsellers", VscStarEmpty, "Best Sellers")}
                {renderNavLink("/dashboard/productdash", MdOutlineShoppingBag, "Product")}
                {renderNavLink("/dashboard/users", BiUser, "Users")}
                {renderNavLink("/dashboard/ordersDashboard", CiViewList, "Orders")}
                {renderNavLink("/dashboard/blogsActivity", GrBlockQuote, "Blogs")}
                {renderNavLink("/dashboard/sales", TbMoneybag , "Sales")}
                {renderNavLink("/dashboard/logactivity", TbActivityHeartbeat, "Log Activity")}
              </>
            )}

            {role === 2 && (
              <>
                {renderNavLink("/dashboard", MdWeb, "Dashboard")}
                {renderNavLink("/dashboard/blogsActivity", CiViewList, "Blogs")}
              </>
            )}

            {role === 3 && (
              <>
                {renderNavLink("/dashboard", MdWeb, "Dashboard")}
                {renderNavLink("/dashboard/categories", RxDashboard, "Categories")}
                {renderNavLink("/dashboard/bestsellers", VscStarEmpty, "Best Sellers")}
                {renderNavLink("/dashboard/users", BiUser, "Users")}
                {renderNavLink("/dashboard/ordersDashboard", CiViewList, "Orders")}
                {renderNavLink("/dashboard/logactivity", TbActivityHeartbeat, "Log Activity")}
              </>
            )}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-30 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
