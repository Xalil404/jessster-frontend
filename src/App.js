import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import NotFound from './components/General/NotFound';
import Navbar from './components/widgets/Navbar';
import Footer from './components/widgets/Footer';
import HomeEnglish from './components/English/HomeEnglish';
import ArticlePage from './components/General/ArticlePage';
import CategoryArticles from './components/English/CategoryArticles';
import AllArticles from './components/English/AllArticles';
import CategoriesBanner from './components/widgets/CategoriesBanner';

import Contact from './components/General/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import PrivateRoute from './components/auth/PrivateRoute';
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
    const location = useLocation(); // Use useLocation inside the Router context

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
            {showCategoriesBanner && <CategoriesBanner />} {/* Only render CategoriesBanner if not on excluded pages */}
            <Routes>
                <Route path="/" element={<HomeEnglish />} />
                <Route path="/posts/:slug" element={<ArticlePage />} /> {/* Route for individual article */}
                <Route path="/category/:categoryId" element={<CategoryArticles />} />
                <Route path="/articles" element={<AllArticles />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 Page */}
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
