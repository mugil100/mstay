/**
 * src/components/FilterPanel.jsx - Sidebar filter controls for listings
 * Passes assembled filter object up via onFilter callback.
 */

import { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        type: '',
        genderAllowed: '',
        rentMin: '',
        rentMax: '',
    });

    const handleChange = (e) => {
        const updated = { ...filters, [e.target.name]: e.target.value };
        setFilters(updated);
        if (onFilter) onFilter(updated);
    };

    const handleReset = () => {
        const reset = { type: '', genderAllowed: '', rentMin: '', rentMax: '' };
        setFilters(reset);
        if (onFilter) onFilter(reset);
    };

    return (
        <aside className="filter-panel">
            <h3>Filters</h3>

            <label>Type</label>
            <select name="type" value={filters.type} onChange={handleChange}>
                <option value="">All</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Flat">Flat</option>
                <option value="Room">Room</option>
            </select>

            <label>Gender</label>
            <select name="genderAllowed" value={filters.genderAllowed} onChange={handleChange}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
            </select>

            <label>Min Rent (₹)</label>
            <input name="rentMin" type="number" value={filters.rentMin} onChange={handleChange} />

            <label>Max Rent (₹)</label>
            <input name="rentMax" type="number" value={filters.rentMax} onChange={handleChange} />

            <button onClick={handleReset} className="btn-reset">Reset Filters</button>
        </aside>
    );
};

export default FilterPanel;
