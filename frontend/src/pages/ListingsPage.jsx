/**
 * src/pages/ListingsPage.jsx - Public listings search & browse page
 * Integrates SearchBar, FilterPanel, and ListingCard components.
 * TODO: Fetch listings from /api/listings with filter params
 * TODO: Integrate RecommendationSection for authenticated students
 */

import { useState, useEffect } from 'react';
import { listingService } from '../services/listingService';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ListingCard from '../components/ListingCard';
import RecommendationSection from '../components/RecommendationSection';
import { useAuth } from '../context/AuthContext';

const ListingsPage = () => {
    const { isAuthenticated, role } = useAuth();
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // TODO: Call listingService.getAll(filters) and setListings(data)
        setLoading(false);
    }, [filters]);

    return (
        <div className="listings-page">
            <SearchBar onSearch={(q) => setFilters({ ...filters, q })} />

            <div className="listings-layout">
                <FilterPanel onFilter={(f) => setFilters({ ...filters, ...f })} />

                <div className="listings-grid">
                    {/* TODO: Render AI recommendation section for logged-in students */}
                    {isAuthenticated && role === 'student' && <RecommendationSection />}

                    {loading && <p>Loading listings...</p>}

                    {listings.length === 0 && !loading && (
                        <p className="empty-state">No listings found. Adjust your filters.</p>
                    )}

                    {listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListingsPage;
