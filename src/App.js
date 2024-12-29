import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
// Widgets
import Navbar from './components/widgets/Navbar';
import Footer from './components/widgets/Footer';
import CategoriesBanner from './components/widgets/CategoriesBanner'; // English banner
// General 
import ArticlePage from './components/General/ArticlePage';
import NotFound from './components/General/NotFound';
import Contact from './components/General/Contact';
// English
import HomeEnglish from './components/English/HomeEnglish';
import CategoryArticles from './components/English/CategoryArticles';
import AllArticles from './components/English/AllArticles';
// Russian
import HomeRussian from './components/Russian/HomeRussian';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import PrivateRoute from './components/auth/PrivateRoute';
// SaaS
import Dashboard from './components/SaaS/Dashboard';
import Tasks from './components/SaaS/Tasks';
import Profile from './components/SaaS/Profile';

const App = () => {
    return (
        <Router> {/* Ensure Router wraps everything */}
            <AppContent />
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation(); // Use useLocation to get the current path

    // Determine the language from the current path
    const language = location.pathname === '/russian' ? 'ru' : 'en';

    // Conditionally render CategoriesBanner based on path
    const showCategoriesBanner = !(
        location.pathname === '/login' || 
        location.pathname === '/register' || 
        location.pathname === '/dashboard' ||
        location.pathname === '/contact' || 
        location.pathname === '/logout' || 
        location.pathname === '/tasks' || 
        location.pathname === '/profile' 
    );

    return (
        <>
            <Navbar /> {/* Add the Navbar here !! */}
            {showCategoriesBanner && <CategoriesBanner language={language} />}
            <Routes>
                <Route path="/" element={<HomeEnglish />} />
                <Route path="/posts/:slug" element={<ArticlePage />} /> {/* Route for individual article */}
                <Route path="/category/:categoryId" element={<CategoryArticles />} />
                <Route path="/articles" element={<AllArticles />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 Page */}
                <Route path="/russian" element={<HomeRussian />} />
                {/* Ensure proper routing for language-based pages */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                /> 
                <Route 
                    path="/logout" 
                    element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/tasks" 
                    element={
                        <PrivateRoute>
                            <Tasks />
                        </PrivateRoute>
                    } 
                /> 
                <Route 
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;

