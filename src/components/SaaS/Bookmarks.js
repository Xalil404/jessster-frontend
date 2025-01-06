import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchLikedArticles } from '../../services/api'; // Adjust the path as necessary


const Bookmarks = () => {
    const [likedArticles, setLikedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation(); // To handle active route styles

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articles = await fetchLikedArticles();
                setLikedArticles(articles);
            } catch (err) {
                setError('Failed to load liked articles. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="dashboard-background">
            <div className="container-fluid">
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    {/* Sidebar */}
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <h2 className="sidebar-heading text-center">Menu</h2>
                        <ul className="nav flex-column">
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className={`nav-link text-dark ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className={`nav-link text-dark ${location.pathname === '/bookmarks' ? 'active' : ''}`} to="/bookmarks">Saved Articles</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className={`nav-link text-dark ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Home Page</Link>
                            </li>
                            <hr className="divider" />
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736174973/image-removebg-preview_1_rez4gn.png"
                                alt="Logo"
                                style={{ width: '100px', height: '100px', marginRight: '0px' }}
                            />
                            <h1 className="d-inline mb-0">Jessster Times</h1>
                        </div>

                        <div className="container mt-1">
                            
                          {/*}  <h1 className="mb-4 text-center fw-bold">Liked Articles</h1>*/}
                            <div className="d-flex justify-content-center"> {/* Flex container for centering */}
                                <div className="list-group" style={{ width: '75%' }}> {/* 75% width for the list group */}
                                    {loading ? (
                                        <p>Loading liked articles...</p>
                                    ) : (
                                        <div>
                                            {likedArticles.length === 0 ? (
                                                <div className="row">
                                                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                                                    <h1 className="text-center mb-5 fw-bold">You haven't liked any articles yet.</h1>
                                                    <h5 className="text-center mb-3">Articles you like will show up here.</h5>
                                                    <h5 className="text-center">To remove articles from your liked list simply unlike them.</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <img
                                                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736181865/web_development___website_webpage_browser_ad_advertisement_man_people_ibpgaq.png"  // Replace with an actual image URL
                                                        alt="No articles"
                                                        className="img-fluid"
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                    />
                                                </div>
                                            </div>
                                            ) : (
                                                likedArticles.map((article) => (
                                                    <Link
                                                        key={article.id}
                                                        to={`/posts/${article.slug}`}  // Link to individual post page
                                                        className="list-group-item list-group-item-action d-flex align-items-center mb-4"
                                                        style={{
                                                            transition: 'background-color 0.3s ease', // Smooth transition for hover
                                                            width: '100%', // Ensure the link takes full width
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#E5E7EB'; // Hover background color for entire card
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = ''; // Reset background color when mouse leaves
                                                        }}
                                                    >
                                                        <img
                                                            src={`https://res.cloudinary.com/dbm8xbouw/${article.featured_image}`}
                                                            alt={article.title}
                                                            className="img-thumbnail me-3"
                                                            style={{ width: '150px', height: 'auto' }}
                                                        />
                                                        <div>
                                                            <h5 className="mb-1">{article.title}</h5>
                                                            <p className="mb-1 text-muted">{article.excerpt || 'No description available'}</p>
                                                        </div>
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;
