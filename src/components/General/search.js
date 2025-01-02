import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { fetchSearchResults } from '../../services/api'; // Import your API function
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {
    const { query } = useParams(); // Extract the query parameter from the URL
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getSearchResults = async () => {
            if (query) {
                const results = await fetchSearchResults(query); // Call the API function with the correct query parameter
                setSearchResults(results.results || []);  // Use 'results' key from the response
            }
        };

        getSearchResults();
    }, [query]); // Re-run when query changes

    return (
        <div className="search-results-container">
            {searchResults && searchResults.length > 0 ? (
                <ul className="list-group">
                    {searchResults.map((result, index) => (
                        <li key={index} className="list-group-item">
                            {/* Display the post title */}
                            {result.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default Search;
