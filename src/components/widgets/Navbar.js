import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const location = useLocation();
    const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Replace with your auth logic

    // Check if the current path is the home page
    const isHomePage = location.pathname === '/';

    // Render nothing if not on the home page
    //if (!isHomePage) return null;
    // Only render the Navbar if the current page is not the login, sign up, or dashboard page
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/dashboard' || location.pathname === '/tasks' || location.pathname === '/profile' || location.pathname === '/logout') {
        return null;  // Do not render the Navbar on these pages
    }

    return (
        <div className="navcolor">
            <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top">
                <div className="container-fluid">
                    {/* Logo (Top Left) */}
                    <Link className="navbar-brand ms-5 order-1" to="/">
                        <img 
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732205459/Screenshot_2024-11-21_at_4.10.09_PM-removebg-preview_fj4w6b.png" 
                            alt="Logo" 
                            className="logo-image" 
                            style={{ width: '200px' }} 
                        />
                    </Link>

                    {/* Language Buttons (Right of Logo in Top Left) */}
                    <div className="d-flex order-2 align-items-center gap-3 ms-3">
                        <Link
                            className="nav-link-a d-none d-lg-block text-dark"
                            style={{ marginRight: '10px', textDecoration: 'none' }}
                            to="/"
                        >
                            English
                        </Link>
                        <Link
                            className="nav-link-a d-none d-lg-block text-dark"
                            style={{ marginRight: '10px', textDecoration: 'none' }}
                            to="/russian"
                        >
                            Русский
                        </Link>
                        <Link
                            className="nav-link-a d-none d-lg-block text-dark"
                            style={{ marginRight: '10px', textDecoration: 'none' }}
                            to="/arabic"
                        >
                            عربي
                        </Link>
                    </div>

                    {/* Navbar Links (Top Left) */}
                    <div className="collapse navbar-collapse order-3" id="navbarText">
                        <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link-nav active text-dark" 
                                        style={{ marginRight: '10px', textDecoration: 'none' }}
                                        to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link-nav active text-dark" 
                                        style={{ marginRight: '10px', textDecoration: 'none' }}
                                        to="/logout">Logout</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Sign In and Sign Up Buttons (Top Right) */}
                    <div className="d-flex order-4 align-items-center gap-3">
                        {!isAuthenticated && (
                            <>
                                <Link
                                    className="nav-link-a d-none d-lg-block text-dark"
                                    style={{ marginRight: '10px', textDecoration: 'none' }}
                                    to="/login"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    className="nav-link btn btn-sm rounded-pill px-4"
                                    style={{
                                        backgroundColor: '#E8BF73',
                                        color: 'black',
                                        padding: '10px 20px', // Increase padding for larger button
                                        marginRight: '10px',
                                        marginLeft: '5px',
                                    }}
                                    to="/register"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;