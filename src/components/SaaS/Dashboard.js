import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../services/api'; // Import the API function

const Dashboard = () => {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null); // State to store user profile
    const [error, setError] = useState(null); // To store any error messages
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    const navigate = useNavigate(); // Initialize navigate function

    // Load user profile when the component mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profileData = await fetchUserProfile(token);
                setUserProfile(profileData); // Set user profile
            } catch (err) {
                setError(err.detail || 'Error fetching user profile');
                console.error('Error fetching user profile:', err);
            }
        };

        loadProfile(); // Call the fetch function when component mounts
    }, [token]); // Dependencies: token

    const handleLogout = () => {
        // Redirect to the Logout component
        navigate('/logout');
    };

    // Determine the background class based on the current route
    const getClassName = () => {
        return location.pathname === '/birthdays' ? 'body-birthdays' : '';
    };

    return (
        <div className='dashboard-background'>
            <div className={`container-fluid ${getClassName()}`}>
              {/* Show error message if it exists */}
              {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    {/* Sidebar */}
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <h2 className="sidebar-heading text-center fw-bold mt-3">Menu</h2>
                        <ul className="nav flex-column">
                        <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold"
                                 to="/dashboard">Dashboard</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/bookmarks">Saved Articles</Link>
                            </li>
                            <hr className="divider" />
                            
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/profile">Profile</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/">Home Page</Link>
                            </li>
                            <hr className="divider" />
                        </ul>
                        
                        {/* User Info and Logout Section */}
                        <div className="sidebar-user-info mt-4 text-center fw-bold">
                            {userProfile && (
                                <p>Welcome, {userProfile.username} ! {/* (ID: {userProfile.id}) */}</p>
                            )}
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-sm btn-danger fw-bold"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736174973/image-removebg-preview_1_rez4gn.png"
                                alt="Logo"
                                style={{ width: '100px', height: '100px', marginRight: '0px' }}
                            />
                            <h1 className="d-inline mb-0">Jessster Times</h1>
                        </div>

                        {/* Welcome section for the homepage */}
                        {location.pathname === '/dashboard' && (
                            <div className="row align-items-center justify-content-center" style={{ flex: 1 }}>
                                <div className="col-md-6 text-center">
                                    <h1 className="mb-3 fw-bold">Welcome to your Jessster account!</h1>
                                    <h6 className="fw-bold mb-3">Articles you like will be saved to your account.</h6>
                                    <p className="fw-bold"> Use the side menu to the left to access your liked articles.
                                        Check in here periodically for updates and new features!
                                    </p>
                                </div>
                                <div className="col-md-6 text-center">
                                    <img
                                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736173686/animals___costume_halloween_outfit_clothes_clothing_cat_feline_kitten_woman_people_vdpry9.png"
                                        alt="Welcome"
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Render child routes */}
                        <Outlet context={{ userProfile, handleLogout }} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;