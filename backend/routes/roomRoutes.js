const express = require('express');
const router = express.Router();
const PgRoom = require('../models/PgRoom');

// Get all Rooms
router.get('/', async (req, res) => {
    try {
        // Populate pgId to get the PG Name alongside
        const rooms = await PgRoom.find().populate('pgId', 'pgName');
        res.json(rooms);
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
            { roomType: searchRegex }
        ];

        if (!isNaN(query)) {
            searchCriteria.push({ sharingCapacity: Number(query) });
            searchCriteria.push({ roomRent: Number(query) });
            searchCriteria.push({ totalBeds: Number(query) });
        }

        if (query.match(/^[0-9a-fA-F]{24}$/)) {
            searchCriteria.push({ _id: query });
            searchCriteria.push({ pgId: query });
        }

        const rooms = await PgRoom.find({ $or: searchCriteria }).populate('pgId', 'pgName');
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await PgRoom.findById(req.params.id).populate('pgId', 'pgName');
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create Room
router.post('/', async (req, res) => {
    const room = new PgRoom(req.body);
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Room
router.put('/:id', async (req, res) => {
    try {
        const updatedRoom = await PgRoom.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Room
router.delete('/:id', async (req, res) => {
    try {
        await PgRoom.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
