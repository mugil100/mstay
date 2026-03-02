const express = require('express');
const router = express.Router();
const PgListing = require('../models/PgListing');

// Get all PG Listings
router.get('/', async (req, res) => {
    try {
        const listings = await PgListing.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Versatile Search Route
router.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const searchRegex = new RegExp(query, 'i');

        let searchCriteria = [
            { pgName: searchRegex },
            { location: searchRegex },
            { address: searchRegex },
            { genderPreference: searchRegex }
        ];

        if (query.match(/^[0-9a-fA-F]{24}$/)) {
            searchCriteria.push({ _id: query });
        }

        const listings = await PgListing.find({ $or: searchCriteria });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single PG Listing
router.get('/:id', async (req, res) => {
    try {
        const listing = await PgListing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create PG Listing
router.post('/', async (req, res) => {
    const listing = new PgListing(req.body);
    try {
        const newListing = await listing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update PG Listing
router.put('/:id', async (req, res) => {
    try {
        const updatedListing = await PgListing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete PG Listing
router.delete('/:id', async (req, res) => {
    try {
        await PgListing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Listing deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
