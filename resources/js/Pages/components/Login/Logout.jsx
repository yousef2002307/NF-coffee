import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { Host } from '../../Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Logout({ ju = 'text-center justify-center' }) {
    const navigate = useNavigate();
const {t}=useTranslation()
    const handleLogout = async () => {
     
        
             
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('UserId');
                localStorage.removeItem('isAdmin');
                 localStorage.removeItem("role");
                 navigate('/login');
 window.location.reload();
               
               
           
    };

    return (
        <button
            onClick={handleLogout}
            className={`flex items-center ${ju} gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200`}
        >
            <LuLogOut /> {t("Logout")}
        </button>
    );
}
