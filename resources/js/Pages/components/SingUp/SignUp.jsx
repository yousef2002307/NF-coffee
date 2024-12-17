import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Api/Api';  
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error(t("Passwords do not match"));
            return;
        }

        const userData = { name, email, phone, password, password_confirmation: confirmPassword };

        try {
            const data = await registerUser(userData);

            setSuccessMessage(t("Signup successful! Redirecting to login..."));
            setTimeout(() => {
                navigate('/login');
                window.location.reload();
            }, 1000); 
        } catch (err) {
            toast.error(err.message || t("Signup failed. Please check your details and try again."));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t("Sign Up")}</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("Enter your name")}
                        className="w-full p-3 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("Enter your email")}
                        className="w-full p-3 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("Enter your phone")}
                        className="w-full p-3 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("Enter your password")}
                        className="w-full p-3 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t("Confirm your password")}
                        className="w-full p-3 mb-6 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-[#F6944D]"
                    >
                        {t("Sign Up")}
                    </button>
                </form>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}

                <p className="text-center text-gray-600 mt-4">
                    {t("Already have an account?")}{" "}
                    <span 
                        onClick={() => navigate('/login')}
                        className="text-teal-500 cursor-pointer hover:underline"
                    >
                        {t("Login")}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
