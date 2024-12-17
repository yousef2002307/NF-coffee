import React, { useState, useEffect } from 'react';
import { CiUser } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import Logout from './Logout';
import { GrDashboard } from 'react-icons/gr';
import { useTranslation } from "react-i18next";

const UserButton = () => {
    const {t}=useTranslation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin check
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const adminStatus = localStorage.getItem('isAdmin') === '1'; // Check if admin

        if (token) {
            setIsLoggedIn(true);
            setUserName(name);
            setIsAdmin(adminStatus); // Set admin state
        }
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            setShowDropdown(!showDropdown);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="relative">
            <div
                onClick={handleButtonClick}
                className="flex items-center p-2 md:text-[25px] text-[20px] text-black"
            >
                <CiUser />
            </div>

            {isLoggedIn && showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <p className="px-4 py-2 text-gray-800 text-center font-semibold">
                        {t("Hello,")} {userName}
                    </p>
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex justify-center items-center gap-3 w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                        <BiUser /> {t("Profile")}
                    </button>
                    {isAdmin && ( // Conditionally render Dashboard button for admins
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex justify-center items-center gap-3 w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        >
                          <GrDashboard/>  {t("Dashboard")}
                        </button>
                    )}
                    <Logout />
                </div>
            )}
        </div>
    );
};

export default UserButton;
