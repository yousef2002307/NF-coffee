import { useState } from "react";
import { BiSearch, BiUser } from "react-icons/bi";
import Logout from "../../components/Login/Logout";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdWeb } from "react-icons/md";

const Navbar = () => {
  const name = localStorage.getItem("name") || "Guest";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex justify-around md:justify-between  items-center bg-[#F3ECE6] p-4 lg:px-10">
 
      <div className="text-[15px] lg:text-[25px] sm:text-center sm:ml-16 ml-0 font-bold">Dashboard</div>

      
      <div className="flex items-center gap-4 lg:gap-6">
      
        

      
        <div className="  flex flex-col items-end">
          <p className="md:text-lg text-sm">Coffee Point</p>
          <p className="text-sm text-[#F6944D]">{` ${name}`}</p>
        </div>

      
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
          
            <IoIosArrowDown />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-50 w-32">
              <ul className="py-1">
               
                <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-2">
                  <MdWeb/> <Link to="/" >WebSite</Link>
                 
                </li>
                <li className="">
                  <Logout />
                </li>
                
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
