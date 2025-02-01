import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import RussianBreakingNewsBanner from '../widgets/RussianBreakingNewsBanner';

const RussianAllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const fetchedArticles = await fetchPosts();
                // Filter articles to get only those where language is 'en' (English)
                const englishArticles = fetchedArticles.filter(
                    (article) => article.language === 'ru'
                );
                setArticles(englishArticles);
            } catch (err) {
                setError('Failed to fetch articles');
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);


    if (loading) {
        return <div className="text-center mt-5">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (articles.length === 0) {
        return <div className="text-center mt-5">No articles available</div>;
    }

    return (
        <div className="container mt-1">
            <RussianBreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            <h1 className="mb-4 text-center fw-bold">Все статьи</h1>
            <div className="d-flex justify-content-center"> {/* Flex container for centering */}
                <div className="list-group" style={{ width: '75%' }}> {/* 75% width for the list group */}
                    {articles.map((article) => (
                        <a
                            key={article.id}
                            href={`/posts/${article.slug}`}  // Link to individual post page
                            className="list-group-item list-group-item-action d-flex align-items-center mb-4"
                            style={{
                                transition: 'background-color 0.3s ease', // Smooth transition for hover
                                width: '100%', // Ensure the link takes full width
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#E5E7EB'; // Hover background color for entire card
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = ''; // Reset background color when mouse leaves
                            }}
                        >
                            <img
                                src={`https://res.cloudinary.com/dbm8xbouw/${article.featured_image}`}
                                alt={article.title}
                                className="img-thumbnail me-3"
                                style={{ width: '150px', height: 'auto' }}
                            />
                            <div>
                                <h5 className="mb-3" style={{fontWeight: 'bold',}}>{article.title}</h5>
                                <p className="mb-1 text-muted">{article.excerpt || 'No description available'}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default RussianAllArticles;