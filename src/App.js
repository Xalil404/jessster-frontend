// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import HomeEnglish from './components/HomeEnglish';
import ArticlePage from './components/ArticlePage';
import CategoryArticles from './components/CategoryArticles';
import AllArticles from './components/AllArticles';

import Contact from './components/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Profile from './components/Profile';


const App = () => {
  return (
      <Router>
          <Navbar /> {/* Add the Navbar here !! */}
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
                /> {/* Make Logout a private route */}
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
      </Router>
  );
};

export default App;