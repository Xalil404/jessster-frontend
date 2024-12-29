import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import { useParams } from 'react-router-dom'; // Import the useParams hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

const RussianCategoryArticles = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { categoryId } = useParams(); // Use the useParams hook to get categoryId (which is actually the category name in this case)

    useEffect(() => {
        const getPostsByCategory = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await fetchPosts();
                // Filter by category name (categoryId is actually the category name here)
                const filteredPosts = fetchedPosts.filter(
                    (post) => post.category && post.category.name.toLowerCase() === categoryId.toLowerCase() && post.language === 'ru'
                );
                setPosts(filteredPosts);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            getPostsByCategory();
        }
    }, [categoryId]);

    if (loading) {
        return <div className="text-center mt-5">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center mt-5">No articles available for this category</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Articles in this Category</h1>
            <div className="row d-flex">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <a
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark"
                        >
                            <div
                                className="d-flex align-items-center shadow-sm p-3"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '5px',
                                    height: '100px',
                                }}
                            >
                                <img
                                    src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                    alt={post.title}
                                    className="img-fluid me-3"
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                    }}
                                />
                                <div>
                                    <h5 className="mb-0">{post.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RussianCategoryArticles;