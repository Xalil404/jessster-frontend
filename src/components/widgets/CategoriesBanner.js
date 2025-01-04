import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../services/api'; // Make sure this function supports fetching categories for both languages

const CategoriesBanner = ({ language }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories(language); // Fetch categories based on language
                setCategories(fetchedCategories);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, [language]); // Fetch categories when the language changes

    const handleCategorySelect = (categorySlug) => {
        let basePath = '/category'; // Default to English
    
        // Adjust the path for different languages
        if (language === 'ru') {
            basePath = '/ru/category';  // For Russian
        } else if (language === 'ar') {
            basePath = '/ar/category';  // For Arabic
        }
    
        // Navigate to the appropriate category page
        navigate(`${basePath}/${categorySlug}`);
    };
    
    

    if (loading) {
        return <div className="text-center mt-3">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center mt-3 text-danger">{error}</div>;
    }

    return (
        <div className="container">
            <hr />
            <div className="d-flex flex-wrap justify-content-center p-2 rounded">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className="btn mx-2 m-1 fw-bold"
                        style={{
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white', // Text is white by default
                            transition: 'all 0.3s ease', // Smooth transition
                        }}
                        onClick={() => handleCategorySelect(category.name)}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'black'; // Text becomes black on hover
                            e.target.style.borderColor = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'black';
                            e.target.style.color = 'white'; // Text becomes white when not hovered
                            e.target.style.borderColor = 'black';
                        }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default CategoriesBanner;
