/**
 * src/pages/AddListingPage.jsx - Owner creates or edits a listing
 * TODO: Connect to listingService.create() on submit
 * TODO: Add image upload (Cloudinary / S3 integration)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingService } from '../services/listingService';

const AddListingPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'PG',
        genderAllowed: 'any',
        rent: '',
        deposit: '',
        city: '',
        amenities: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // TODO: Transform amenities string to array, build address object
            await listingService.create(form);
            navigate('/owner/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to create listing');
        }
    };

    return (
        <div className="form-page">
            <h1>Add New Listing</h1>
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit} className="listing-form">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} />

                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Flat">Flat</option>
                    <option value="Room">Room</option>
                </select>

                <label>Gender Allowed</label>
                <select name="genderAllowed" value={form.genderAllowed} onChange={handleChange}>
                    <option value="any">Any</option>
                    <option value="male">Male Only</option>
                    <option value="female">Female Only</option>
                </select>

                <label>Monthly Rent (₹)</label>
                <input name="rent" type="number" value={form.rent} onChange={handleChange} required />

                <label>Deposit (₹)</label>
                <input name="deposit" type="number" value={form.deposit} onChange={handleChange} />

                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} required />

                <label>Amenities (comma-separated)</label>
                <input name="amenities" value={form.amenities} onChange={handleChange} placeholder="WiFi, AC, Laundry" />

                {/* TODO: Image upload component */}

                <button type="submit">Submit for Approval</button>
            </form>
        </div>
    );
};

export default AddListingPage;
