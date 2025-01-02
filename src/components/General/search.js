import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSearchResults } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getSearchResults = async () => {
            if (query) {
                const results = await fetchSearchResults(query);
                setSearchResults(results.results || []);
            }
        };

        getSearchResults();
    }, [query]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Search Results for "{query}"</h2>
            {searchResults && searchResults.length > 0 ? (
                <div className="d-flex justify-content-center">
                    <div className="list-group w-75 mx-auto"> {/* Ensure list-group is centered and takes up 75% width */}
                        {searchResults.map((result, index) => (
                            <a
                                key={index}
                                href={`/posts/${result.slug}`}
                                className="list-group-item list-group-item-action d-flex align-items-center mb-4"
                                style={{ width: '100%' }} // Make each item take full width of its container
                            >
                                <img
                                    src={`https://res.cloudinary.com/dbm8xbouw/${result.featured_image}`}
                                    alt={result.title}
                                    className="img-thumbnail me-3"
                                    style={{ width: '150px', height: 'auto' }}
                                />
                                <div>
                                    <h5 className="mb-1">{result.title}</h5>
                                    <p className="mb-1 text-muted">{result.excerpt || 'No description available'}</p>
                                    <small className="text-muted">Posted on {new Date(result.created_on).toLocaleDateString()}</small>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default Search;
