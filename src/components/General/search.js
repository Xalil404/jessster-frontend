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
            <h2 className="mb-4 fw-bold">Search Results for "{query}"</h2>
            {searchResults && searchResults.length > 0 ? (
                <div className="d-flex justify-content-center">
                    <div className="list-group w-75 mx-auto"> {/* Ensure list-group is centered and takes up 75% width */}
                        {searchResults.map((result, index) => (
                            <a
                                key={index}
                                href={`/posts/${result.slug}`}
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
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column text-start me-4"> {/* Left column for text */}
                        <h1 className="mb-2 fw-bold">No results found</h1>
                        <h3 className="mb-4 fw-bold">Try another term</h3>
                    </div>
                    <div> {/* Right column for the image */}
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726666674/20_hggzzz.png"
                            alt="No results"
                            style={{ width: '350px', height: 'auto' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
