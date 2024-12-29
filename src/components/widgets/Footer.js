// src/components/Footer.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();

    // If on the login, register, or dashboard pages, do not render the footer
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/dashboard' || location.pathname === '/tasks' || location.pathname === '/profile' || location.pathname === '/logout') {
        return null; // Do not render footer
    }

    return (
        <footer className="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
            <Link to="/" className="footer">
                <img 
                    src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732205459/Screenshot_2024-11-21_at_4.10.09_PM-removebg-preview_fj4w6b.png"
                    alt="Logo" 
                    className="logo-image" 
                    style={{ width: '200px' }} 
                />
            </Link>
            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item px-2">
                    <Link 
                        to="/contact" 
                        className="nav-link px-2 text-dark" 
                    >
                        Contact
                    </Link>
                </li>
                <li className="nav-item px-2">
                    <a 
                        href="https://www.termsfeed.com/live/1fd2ca25-0553-48c4-97d8-308e55709144" 
                        className="nav-link px-2 text-dark" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Terms
                    </a>
                </li>
                <li className="nav-item px-2">
                    <a 
                        href="https://www.termsfeed.com/live/ba80401d-3f01-4082-96ce-a0196d9cd3ac" 
                        className="nav-link px-2 text-dark" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Privacy
                    </a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
