import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchProfile } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from '../General/search'; // Import the Search component

const Header = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const isAuthenticated = Boolean(localStorage.getItem('authToken'));
    const token = localStorage.getItem('authToken');
    const [searchResults, setSearchResults] = useState([]);

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const loadProfilePicture = async () => {
            if (token) {
                try {
                    const profileData = await fetchProfile(token);
                    setProfilePicture(profileData.profile_picture);
                } catch (error) {
                    console.error('Error fetching profile picture:', error);
                    setProfilePicture('https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726685042/Group_949_oufsqq.png');
                }
            }
        };

        loadProfilePicture();
    }, [token]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search on pressing Enter
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            window.location.href = `/search/${searchQuery.trim()}`;
        }
    };
    

    // Fetch search results from API
    const fetchSearchResults = async (query) => {
        if (query.trim()) {
            try {
                const results = await fetchSearchResults(query); // Recursive call here!
                setSearchResults(results); // Update the search results state
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    };
    

    if (
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/dashboard' ||
        location.pathname === '/tasks' ||
        location.pathname === '/profile' ||
        location.pathname === '/logout'
    ) {
        return null;
    }

    return (
        <div className="navcolor">
            <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-5 order-1" to="/">
                        <img 
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1735906765/lo_jun5f9.png" 
                            alt="Logo" 
                            className="logo-image" 
                            style={{ width: '200px' }} 
                        />
                    </Link>

                    <div className="d-flex order-2 align-items-center gap-3 ms-3">
                        <Link className="nav-link-a d-none d-lg-block text-dark fw-bold" style={{ textDecoration: 'none', marginLeft: '15px' }} to="/">
                            English
                        </Link>
                        <Link className="nav-link-a d-none d-lg-block text-dark fw-bold" style={{ textDecoration: 'none', marginLeft: '15px' }} to="/russian">
                            Русский
                        </Link>
                        <Link className="nav-link-a d-none d-lg-block text-dark fw-bold" style={{ textDecoration: 'none', marginLeft: '15px' }} to="/arabic">
                            عربي
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse order-3" id="navbarText">
                        <ul className="navbar-nav mb-2 mb-lg-0 me-auto"></ul>
                    </div>

                    <div className="d-flex order-4 align-items-center gap-3">
                        {/* Search Bar */}
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyPress} // Trigger search on Enter key press
                                style={{ width: '200px', borderRadius: '25px', marginRight: '15px' }}
                            />
                        </div>

                        {!isAuthenticated ? (
                            <>
                                {/*}
                                <Link
                                    className="nav-link-a d-none d-lg-block text-dark"
                                    style={{ marginRight: '10px', textDecoration: 'none' }}
                                    to="/google-login" // Adjust this to the path of your Google login page
                                >
                                    Google Pop Up
                                </Link>

                                <Link
                                    className="nav-link-a d-none d-lg-block text-dark"
                                    style={{ marginRight: '10px', textDecoration: 'none' }}
                                    to="/apple-login" // Adjust this to the path of your Google login page
                                >
                                    Apple Pop up
                                </Link>
                                */}
                                
                                <Link className="nav-link-a d-none d-lg-block text-dark fw-bold" style={{ textDecoration: 'none', marginRight: '15px' }} to="/login">
                                    Sign in
                                </Link>
                                <Link
                                    className="nav-link btn btn-sm rounded-pill px-4 fw-bold"
                                    style={{
                                        backgroundColor: '#000',
                                        color: 'white',
                                        padding: '10px 20px',
                                        transition: 'all 0.3s ease', // Smooth transition for hover effect
                                        border: '2px solid black', // Keeps the border black
                                        borderRadius: '50px', // Ensures rounded corners
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#fff';
                                        e.target.style.color = 'black';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#000';
                                        e.target.style.color = 'white';
                                    }}
                                    to="/register"
                                >
                                    Get Started
                                </Link>

                            </>
                        ) : (
                            <div className="dropdown">
                                <a
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={profilePicture || "https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726685042/Group_949_oufsqq.png"}
                                        alt="Profile"
                                        className="rounded-circle"
                                        width="40"
                                        height="40"
                                    />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/dashboard"
                                        style={{
                                            backgroundColor: '#fff', // default background
                                            color: '#000', // default text color
                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#f0f0f0'; // Hover background
                                            e.target.style.color = '#000'; // Hover text color
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#fff'; // Reset background
                                            e.target.style.color = '#000'; // Reset text color
                                        }}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/logout"
                                        style={{
                                            backgroundColor: '#fff', // default background
                                            color: '#000', // default text color
                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#f0f0f0'; // Hover background
                                            e.target.style.color = '#000'; // Hover text color
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#fff'; // Reset background
                                            e.target.style.color = '#000'; // Reset text color
                                        }}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Conditionally Render Search Results */}
            {searchResults.length > 0 && <Search results={searchResults} />}
        </div>
    );
};

export default Header;
