const express = require('express');
const router = express.Router();
const PgAvailability = require('../models/PgAvailability');
const PgRoom = require('../models/PgRoom');

// Get all Availability Records
router.get('/', async (req, res) => {
    try {
        const records = await PgAvailability.find()
            .populate({
                path: 'roomId',
                select: 'roomType totalBeds pgId',
                populate: { path: 'pgId', select: 'pgName' }
            });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update or Create Availability for a Room
router.put('/:roomId', async (req, res) => {
    try {
        const { availableBeds, status } = req.body;

        // Check if room exists
        const room = await PgRoom.findById(req.params.roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Find existing availability or create new
        let availability = await PgAvailability.findOne({ roomId: req.params.roomId });

        if (availability) {
            availability.availableBeds = availableBeds;
            availability.status = status;
            availability.lastUpdatedOn = Date.now();
            await availability.save();
            res.json(availability);
        } else {
            const newAvailability = new PgAvailability({
                roomId: req.params.roomId,
                availableBeds,
                status,
                lastUpdatedOn: Date.now()
            });
            await newAvailability.save();
            res.status(201).json(newAvailability);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
