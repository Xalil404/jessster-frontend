import React, { useState, useEffect } from 'react';
import { fetchMostLikedPosts } from '../../services/api'; // Import the function to fetch most liked posts

const RuMostLiked = () => {
    const [mostLikedPosts, setMostLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMostLikedPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await fetchMostLikedPosts(); // Fetch posts sorted by likes
            console.log('Fetched Posts:', fetchedPosts);

            const englishPosts = fetchedPosts.filter(post => post.language === 'ru'); // Filter for English posts
            console.log('Filtered English Posts:', englishPosts);

            // Sort by likes in descending order
            const sortedPosts = englishPosts.sort((a, b) => b.likes_count - a.likes_count);
            console.log('Sorted Posts:', sortedPosts);

            // Get only the top 4 most liked
            setMostLikedPosts(sortedPosts.slice(0, 4)); // Get top 4 most liked posts
        } catch (err) {
            setError('Failed to fetch most liked posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMostLikedPosts();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-5 fw-bold">Самые популярные статьи</h2>
            <div className="row d-flex">
                {/* Left Column */}
                <div className="col-md-6 d-flex flex-column">
                    {mostLikedPosts.slice(0, 1).map((post) => (
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
                    {mostLikedPosts.slice(1).map((post) => (
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

export default RuMostLiked;