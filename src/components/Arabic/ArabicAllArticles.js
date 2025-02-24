import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import ArabicBreakingNewsBanner from '../widgets/ArabicBreakingNewsBanner';

const ArabicAllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 20;

    useEffect(() => {
        const getArticles = async () => {
            try {
                const fetchedArticles = await fetchPosts();
                // Filter articles to get only those where language is 'en' (English)
                const englishArticles = fetchedArticles.filter(
                    (article) => article.language === 'ar'
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
        return <div className="text-center mt-5">جاري تحميل المقالات...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (articles.length === 0) {
        return <div className="text-center mt-5">No articles available</div>;
    }

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <div className="container mt-1">
            <ArabicBreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            <h1 className="mb-4 text-center fw-bold">كل المقالات</h1>
            <div className="d-flex justify-content-center"> {/* Flex container for centering */}
                <div className="list-group" style={{ width: '75%' }}> {/* 75% width for the list group */}
                    {currentArticles.map((article) => (
                        <a
                            key={article.id}
                            href={`/posts/${article.slug}`}  // Link to individual post page
                            className="list-group-item list-group-item-action d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4"
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
                                className="img-thumbnail d-block d-md-inline mx-auto mx-md-0 me-md-3"
                                style={{ width: '150px', height: 'auto' }}
                            />
                            <div dir="rtl" className="text-end w-100">
                                <h5 className="mb-3">{article.title}</h5>
                                <p className="mb-1 text-muted">{article.excerpt || 'No description available'}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-dark me-2 fw-bold"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="align-self-center fw-bold px-3">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-dark ms-2 fw-bold"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default ArabicAllArticles;