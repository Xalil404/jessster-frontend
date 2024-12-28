import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate
import { fetchCategories } from '../../services/api'; // Adjust path if needed

const CategoriesBanner = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    const handleCategorySelect = (categoryName) => {
        navigate(`/category/${categoryName.toLowerCase()}`); // Use category name (lowercased) in URL
    };

    if (loading) {
        return <div className="text-center mt-3">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center mt-3 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-3" style={{ margin: '10px 10px' }}>
            <div className="d-flex flex-wrap justify-content-center bg-light p-2 rounded">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className="btn btn-outline-primary m-1"
                        onClick={() => handleCategorySelect(category.name)} // Pass category name
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoriesBanner;
