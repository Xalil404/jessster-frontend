import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api'; // Assuming you have this function to fetch posts
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

const HomeEnglish = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                const englishPosts = fetchedPosts
                    .filter(post => post.language === 'en')
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
            <h1 className="mb-4">Blog Posts (English)</h1>
            <div className="row">
                {/* Column 1 */}
                <div className="col-md-6">
                    {/* Latest Article */}
                    {posts[0] && (
                        <div className="card mb-4 border-0 shadow-lg">
                            <img
                                src={`https://res.cloudinary.com/dbm8xbouw/${posts[0].featured_image}`}
                                className="card-img-top"
                                alt={posts[0].title}
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h2 className="card-title">{posts[0].title}</h2>
                                <a href={`/posts/${posts[0].slug}`} className="btn btn-primary">
                                    Read More
                                </a>
                            </div>
                        </div>
                    )}
                    {/* Other Articles in Column 1 */}
                    {posts
                        .slice(1) // Exclude the first post
                        .filter((_, index) => index % 2 === 0) // Alternate articles for Column 1
                        .map((post) => (
                            <div className="d-flex mb-3" key={post.id}>
                                <img
                                    src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                    alt={post.title}
                                    className="img-fluid me-3"
                                    style={{ width: '40%', height: '100px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h6>{post.title}</h6>
                                    <a href={`/posts/${post.slug}`} className="btn btn-link p-0">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Column 2 */}
                <div className="col-md-6">
                    {posts
                        .slice(1) // Exclude the first post
                        .filter((_, index) => index % 2 !== 0) // Alternate articles for Column 2
                        .map((post) => (
                            <div className="d-flex mb-3" key={post.id}>
                                <img
                                    src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                    alt={post.title}
                                    className="img-fluid me-3"
                                    style={{ width: '40%', height: '100px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h6>{post.title}</h6>
                                    <a href={`/posts/${post.slug}`} className="btn btn-link p-0">
                                        Read More
                                    </a>
                                </div>
                            </div>
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
