import React, { useState, useEffect } from 'react';
import { fetchMostViewedPosts } from '../../services/api'; // Assuming you have this function to fetch posts

const MostViewed = () => {
    const [mostViewedPosts, setMostViewedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMostViewedPosts = async (language) => {
        setLoading(true);
        try {
            const fetchedPosts = await fetchMostViewedPosts(language); // Pass language here
            setMostViewedPosts(fetchedPosts); // Set the fetched posts
        } catch (err) {
            setError('Failed to fetch most viewed posts');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const userLanguage = 'en';  // Set based on user's language, e.g., 'en', 'ar', 'ru'
        getMostViewedPosts(userLanguage);
    }, []);
    

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-5 fw-bold">Most Viewed Articles</h2>
            <div className="row d-flex">
                {/* Left Column */}
                <div className="col-md-6 d-flex flex-column">
                    {mostViewedPosts.slice(0, 1).map((post) => (
                        <a
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark mb-4"
                        >
                            <div
                                className="d-flex align-items-center shadow-sm p-3"
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    borderRadius: '5px',
                                    height: '348px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '40%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        borderRadius: '5px',
                                    }}
                                >
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="ms-3" style={{ flex: 1 }}>
                                    <h5
                                        className="mb-0"
                                        style={{
                                            whiteSpace: 'normal',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: '4.5em',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {post.title}
                                    </h5>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Right Column */}
                <div className="col-md-6 d-flex flex-column">
                    {mostViewedPosts.slice(1).map((post) => (
                        <a
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark mb-4"
                        >
                            <div
                                className="d-flex align-items-center shadow-sm p-3 small-post"
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    borderRadius: '5px',
                                    height: '100px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        borderRadius: '5px',
                                    }}
                                >
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="ms-3" style={{ flex: 1 }}>
                                    <h5
                                        className="mb-0"
                                        style={{
                                            whiteSpace: 'normal',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: '3em',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {post.title}
                                    </h5>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MostViewed;
