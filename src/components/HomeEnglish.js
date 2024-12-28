import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api'; // Assuming you have this function to fetch posts
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import BreakingNewsBanner from './widgets/BreakingNewsBanner';



const HomeEnglish = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                const englishPosts = fetchedPosts
                    .filter((post) => post.language === 'en')
                    .slice(0, 13); // Get only the latest 13 English posts
                setPosts(englishPosts);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center mt-5">No English posts available</div>;
    }

    return (
        <div className="container mt-5">
            <BreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            <h1 className="mb-4">Blog Posts (English)</h1>
            <div className="row d-flex" style={{ minHeight: '100vh' }}>
                {/* Left Column */}
                <div className="col-md-6 d-flex flex-column">
                    {posts.slice(0, 5).map((post, index) => (
                        <a
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark mb-4"
                        >
                            <div
                                className={`d-flex align-items-center shadow-sm p-3 ${
                                    index === 0 ? 'large-post' : 'small-post'
                                }`}
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '5px',
                                    height: index === 0 ? '200px' : '100px',
                                }}
                            >
                                <div
                                    style={{
                                        width: index === 0 ? '40%' : '20%',
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
                                            whiteSpace: 'normal', // Allow wrapping
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: index === 0 ? 3 : 2, // Control lines for large vs. small posts
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: index === 0 ? '4.5em' : '3em', // Constrain height
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
                    {posts.slice(5, 11).map((post) => (
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
                                            whiteSpace: 'normal', // Allow wrapping
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2, // Limit to 2 lines
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: '3em', // Constrain height
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

            {/* View More Button */}
            <div className="text-center mt-4">
                <a href="/articles" className="btn btn-secondary">
                    View More Articles
                </a>
            </div>
        </div>
    );
};

export default HomeEnglish;
