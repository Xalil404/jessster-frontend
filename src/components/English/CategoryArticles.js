import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import { useParams } from 'react-router-dom'; // Import the useParams hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import BreakingNewsBanner from '../widgets/BreakingNewsBanner';

const CategoryArticles = ({ language }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { categoryId } = useParams(); // Use the useParams hook to get categoryId (which is actually the category name in this case)

    useEffect(() => {
        const getPostsByCategory = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await fetchPosts();
                // Filter by category name and language
                const filteredPosts = fetchedPosts.filter(
                    (post) => 
                        post.category && 
                        post.category.name.toLowerCase() === categoryId.toLowerCase() && 
                        post.language === language
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
    }, [categoryId, language]);

    if (loading) {
        return <div className="text-center mt-5">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (posts.length === 0) {
        return (
            <div className="container mt-5 d-flex justify-content-center align-items-center">
                {/* Left column for text */}
                <div className="d-flex flex-column text-start me-4">
                    <h1 className="mb-2 fw-bold mb-4">No articles in this category</h1>
                    <h3 className="mb-4 fw-bold">Try another category</h3>
                </div>
                {/* Right column for the image */}
                <div>
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726666674/20_hggzzz.png"
                        alt="No results"
                        style={{ width: '350px', height: 'auto' }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-1">
            <BreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            <h1 className="mb-4 fw-bold text-center">Articles in this Category</h1>
            <div className="d-flex flex-column align-items-center">
                {posts.map((post) => (
                    <a
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="text-decoration-none text-dark"
                    >
                        <div
                            className="d-flex align-items-center shadow-sm p-3 mb-4 article-hover"
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '5px',
                                width: '100%',
                                maxWidth: '700px', // Ensure the card doesn't stretch too wide
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#E5E7EB'; // Hover background color for entire card
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = ''; // Reset background color when mouse leaves
                            }}
                        >
                            <img
                                src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                alt={post.title}
                                className="img-fluid me-3"
                                style={{
                                    width: '150px',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                }}
                            />
                            <div>
                                <h5 className="mb-0">{post.title}</h5>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CategoryArticles;

