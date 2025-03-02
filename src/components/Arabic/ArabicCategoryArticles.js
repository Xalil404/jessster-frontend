import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import { useParams } from 'react-router-dom'; // Import the useParams hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import ArabicBreakingNewsBanner from '../widgets/ArabicBreakingNewsBanner';

const ArabicCategoryArticles = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { categoryId } = useParams(); // Use the useParams hook to get categoryId (which is actually the category name in this case)

    useEffect(() => {
        const getPostsByCategory = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await fetchPosts();
                // Filter by category name and language (set language to 'ru' for Russian)
                const filteredPosts = fetchedPosts.filter(
                    (post) => 
                        post.category && 
                        post.category.name.toLowerCase() === categoryId.toLowerCase() && 
                        post.language === 'ar' // Filter by language
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
        return (
            <div className="container mt-5 d-flex justify-content-center align-items-center">
                    {/* Left column for text */}
                    <div className="d-flex flex-column text-start me-4">
                        <h1 className="mb-2 fw-bold mb-4">لا يوجد مقالات في هذه الفئة</h1>
                        <h3 className="mb-4 fw-bold">جرب فئة أخرى</h3>
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
            <ArabicBreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            <h1 className="mb-4 fw-bold text-center">المقالات في هذه الفئة</h1>
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

export default ArabicCategoryArticles;