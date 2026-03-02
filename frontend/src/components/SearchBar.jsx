/**
 * src/components/SearchBar.jsx - Global search bar for listings
 * Executes search on form submit and passes query up via onSearch.
 */

import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query.trim());
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by city, locality or property name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
        </form>
    );
};

export default SearchBar;
