/**
 * src/hooks/useListings.js - Custom hook for fetching listings with filters
 * TODO: Add pagination support (page, limit state variables)
 */

import { useState, useEffect } from 'react';
import { listingService } from '../services/listingService';

export const useListings = (filters = {}) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        listingService
            .getAll(filters)
            .then((res) => {
                if (!cancelled) setListings(res.data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [JSON.stringify(filters)]);

    return { listings, loading, error };
};
