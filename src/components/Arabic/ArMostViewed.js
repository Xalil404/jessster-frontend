import React, { useState, useEffect } from 'react';
import { fetchMostViewedPosts } from '../../services/api'; // Assuming you have this function to fetch posts

const ArMostViewed = () => {
    const [mostViewedPosts, setMostViewedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMostViewedPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await fetchMostViewedPosts();
            console.log('Fetched Posts:', fetchedPosts); // Log the fetched posts
            
            const englishPosts = fetchedPosts.filter(post => post.language === 'ar');
            console.log('Filtered English Posts:', englishPosts); // Log filtered posts

            // Sort by views in descending order
            const sortedPosts = englishPosts.sort((a, b) => b.view_count - a.view_count);
            console.log('Sorted Posts:', sortedPosts); // Log sorted posts

            // Get only the top 4 most viewed
            setMostViewedPosts(sortedPosts.slice(0, 4)); // Get top 4
        } catch (err) {
            setError('Failed to fetch most viewed posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMostViewedPosts();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Most Viewed Articles</h2>
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
                                    backgroundColor: '#f8f9fa',
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
                                        src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
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
                                    backgroundColor: '#f8f9fa',
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
                                        src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
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

export default ArMostViewed;
