import React, { useState, useEffect } from "react";
import "../../css/app.css";
import "./i18n";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavLonguage from "./components/Header/NavLonguage";
import Header from "./components/Header/Header";
import Home from "./components/Layout/Home";
import { FavoritesProvider } from "./components/Context/FavoritesContext";
import Login from "./components/Login/Login";
import SignupPage from "./components/SingUp/SignUp";
import ProductsPage from "./components/Products/Products";
import SingleProductPage from "./components/Products/SingleProductPage";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import { ProductsProvider } from "./components/Context/ProductsContext";
import Menu from "./components/Menu/Menu";
import { CartProvider } from "./components/Context/CartContext";
import EmailForm from "./components/Contact/Contact";
import Favorites from "./components/Favorites/FavoritesPage";
import BlogList from "./components/BlogList/BlogList";
import SingleBlog from "./components/BlogList/SingleBlog";
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";
import Dashboard from "./Dashboard/pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import DashboardChart from "./Dashboard/components/DashboardChart/DashboardChart";
import CategoriesDash from "./Dashboard/components/Categories/CategoriesDash";
import BestSeller from "./Dashboard/components/BestSellers/BestSellers";
import Users from "./Dashboard/components/Users/Users";
import LogActivity from "./Dashboard/components/Log Activity/LogActivity";
import BlogsActivity from "./Dashboard/components/Blogs/Blogs";
import InfoPage from "./Dashboard/components/Users/InfoPage";
import SingleBlogDashdoard from "./Dashboard/components/Blogs/SingleBlog";
import OrderTable from "./Dashboard/components/Orders/OrdersDashboard";
import Sales from "./Dashboard/components/Sales/Sales";
import ProductDash from "./Dashboard/components/Product/ProductsDash";
import PrivacyPolicy from "./components/Terms & Conditions/Privacy";
import TermsAndConditions from "./components/Terms & Conditions/Terms";
import Menuca from "./Dashboard/components/Categories/Menu";
import OrderDetails from "./Dashboard/components/Orders/OrderDetails";

function Main() {

    return (
        <ProductsProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ToastContainer className="overflow-hidden" />
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </FavoritesProvider>
            </CartProvider>
        </ProductsProvider>
    );
}

function AppContent() {
    const location = useLocation();

    const hideHeaderRoutes = ["/dashboard"];
    const shouldHideHeader = hideHeaderRoutes.some((route) =>
        location.pathname.startsWith(route)
    );

    return (
        <div>
            {!shouldHideHeader && (
                <>
                    <NavLonguage />
                    <Header />
                </>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile"  element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/contactUs" element={<EmailForm />} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
                <Route
                    path="/products/:productId"
                    element={<SingleProductPage />}
                />
                <Route path="/menu" element={<Menu />} />

                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="" element={<DashboardChart />} />

                    <Route
                        path="categories"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <CategoriesDash />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="bestsellers"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <BestSeller />
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="menu/:id"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <Menuca />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="logactivity"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <LogActivity />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="blogsActivity"
                        element={
                            <ProtectedRoute requiredRoles={[1, 2]}>
                                <BlogsActivity />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="blogDashboard/:id"
                        element={
                            <ProtectedRoute requiredRoles={[1, 2]}>
                                <SingleBlogDashdoard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="info/:id"
                        element={
                            <ProtectedRoute requiredRoles={[1]}>
                                <InfoPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="ordersDashboard"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <OrderTable />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="order/:orderId" 
                    element={
                        <ProtectedRoute requiredRoles={[1, 3]}>
                          <OrderDetails />
                        </ProtectedRoute>
                    }
                     />
                     <Route
                        path="sales"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <Sales />
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="productdash"
                        element={
                            <ProtectedRoute requiredRoles={[1, 3]}>
                                <ProductDash />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
            {!shouldHideHeader && <Footer />}
        </div>
    );
}

export default Main;
