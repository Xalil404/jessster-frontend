import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug, toggleLike } from '../../services/api'; // Import like/unlike APIs

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

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h1 className="text-center mb-4">{post.title}</h1>
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
                    <div className="text-center mt-4">
                        <p><strong>Views:</strong> {post.number_of_views}</p>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                                Share
                            </button>
                            <button
                                className={`btn ${isLiked ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={handleLike}
                            >
                                {isLiked ? 'Unlike' : 'Like'} ({likeCount})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Share this article</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Copy the link below to share:</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={window.location.href}
                                    readOnly
                                />
                            </div>
                            <div className="modal-footer">
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
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign In Required</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>You need to sign in to like posts.</p>
                                <a href="/login" className="btn btn-primary">Sign In</a>
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
