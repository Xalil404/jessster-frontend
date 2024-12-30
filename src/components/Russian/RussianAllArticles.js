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
            <h1 className="mb-4">All Articles</h1>
            <div className="row">
                {articles.map((article) => (
                    <div key={article.id} className="col-md-6 mb-4">
                        <a
                            href={`/posts/${article.slug}`}  // Link to individual post page
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
                                    src={`https://res.cloudinary.com/dbm8xbouw/${article.featured_image}`}
                                    alt={article.title}
                                    className="img-fluid me-3"
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                    }}
                                />
                                <div>
                                    <h5 className="mb-0">{article.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RussianAllArticles;