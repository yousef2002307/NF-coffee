// src/components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Api/Api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
const {t}=useTranslation()
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.userinfo.name);
            localStorage.setItem('UserId', data.userinfo.id);
            localStorage.setItem('isAdmin', data.userinfo.is_admin);
            localStorage.setItem('role', data.userinfo.role);

            if (data.userinfo.is_admin === 1) {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

            window.location.reload();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{t("login")}</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("placeholder_email")}
                        className="w-full p-4 mb-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("pas")}
                        className="w-full p-4 mb-6 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#F6944D] text-white p-4 rounded-md"
                    >
                      {t("login")} 
                    </button>
                </form>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <p className="text-center text-gray-600 mt-4">
                    {t("Don't have an account?")} {' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-teal-500 cursor-pointer hover:underline"
                    >
                       {t("Sign Up")}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
