import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug, toggleLike } from '../../services/api'; // Import like/unlike APIs
import Comments from './Comments';

import { Helmet } from 'react-helmet-async';



const ArticlePage = () => {
    const { lang, slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const isUserLoggedIn = !!localStorage.getItem('authToken'); // Example check for login
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostBySlug(slug, lang);
                setPost(fetchedPost);
                setLikeCount(fetchedPost.likes_count);
                setIsLiked(fetchedPost.is_liked); // Assuming your API returns this
                setLoading(false);
            } catch (err) {
                setError('Error fetching the article.');
                setLoading(false);
            }
        };

        getPost();
    }, [slug, lang]);

    const handleLike = async () => {
        if (!isUserLoggedIn) {
            setIsSignInModalOpen(true);
            return;
        }
    
        try {
            // Pass the `slug` instead of `post.id`
            const response = await toggleLike(post.slug);  
            
            if (response.liked !== undefined) {  // Check for response.liked (boolean)
                setIsLiked(response.liked);
                setLikeCount(response.likes_count);
            } else {
                console.error('Failed to toggle like');
            }
        } catch (err) {
            console.error('Error toggling like status:', err);
        }
    };
    
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSignInModalOpen(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    <Helmet>
        <title>{post.title || 'Devbook'}</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        {post.title && <meta property="og:title" content={post.title} />}
        {post.excerpt && <meta property="og:description" content={post.excerpt} />}
        {post.featured_image && (
            <>
                <meta property="og:image" content={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`} />
                <meta name="twitter:image" content={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`} />
            </>
        )}
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
    </Helmet>


    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h1 className="text-center mb-4 fw-bold">{post.title}</h1>
                    <p className="text-muted text-center mb-4">
                        <em>{post.excerpt}</em>
                    </p>
                    {post.featured_image && (
                        <div className="text-center mb-4">
                            <img
                                src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                alt={post.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <div className="d-flex justify-content-center gap-3 mb-4">
                        <p><strong>Author:</strong> {post.author || 'Unknown'}</p>
                        <p><strong>Category:</strong> {post.category?.name || 'No Category'}</p>
                        <p><strong>Published on:</strong> {new Date(post.created_on).toLocaleDateString()}</p>
                    </div>
                    <div
                        className="mb-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>

                    {/* Banner Section */}
                    <div className="my-5 p-4 text-center" style={{ 
                        backgroundColor: '#FFD700',
                        borderRadius: '20px', 
                        }}>
                        <h2 className="fw-bold mb-3">Support Jessster!</h2>
                        <p className="mb-4">Show your appreciation to this platform by making a contribution. Every penny counts.</p>
                        <a href="https://buymeacoffee.com/jessster" className="btn btn-success btn-lg fw-bold">Donate</a>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        {/* Views on the left */}
                        <p className='mt-3'><strong>Views:</strong> {post.number_of_views}</p>
                        {/* Share button centered */}
                        <div className="text-center">
                            <button className="btn btn-dark fw-bold" onClick={() => setIsModalOpen(true)}>
                                Share
                            </button>
                        </div>
                        {/* Like button on the right */}
                        <button
                            className={`btn ${isLiked ? 'btn-success' : 'btn-outline-success fw-bold'}`}
                            onClick={handleLike}
                        >
                            {isLiked ? 'Unlike' : 'Like'} ({likeCount})
                        </button>
                    </div>
                    <hr></hr>
                    
                    {/* Comments Section */}
                    <div className="container mt-5 ">
                        <h2 className="text-center fw-bold">Latest Comments</h2>
                        <Comments
                            postSlug={slug}
                            isAuthenticated={isUserLoggedIn}
                            token={authToken}  // Pass the token to the Comments component
                        />
                    </div>

                </div>
            </div>

            

            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: '#F9FAFC' }} >
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Share this article</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p className='fw-bold text-center'>Copy the link below to share:</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={window.location.href}
                                    readOnly
                                />
                            </div>
                            <div className="modal-footer d-flex justify-content-between w-100">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <button className="btn btn-success" onClick={handleCopyLink}>
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isSignInModalOpen && (
                <div className="modal show d-block" tabIndex="-1"  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: '#F9FAFC' }}>
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Sign In Required</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <p className='text-center fw-bold'>You need to sign in to like posts.</p>
                                <p className='text-center fw-bold'>Liked posts will be saved in your account</p>
                                <a href="/register" className="btn btn-dark btn-lg fw-bold">Sign Up</a>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ArticlePage;
