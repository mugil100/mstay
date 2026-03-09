const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

// Register Owner
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if owner exists
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Owner already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new owner
        const newOwner = new Owner({
            name,
            email,
            password: hashedPassword
        });

        const savedOwner = await newOwner.save();

        // Create token
        const token = jwt.sign(
            { id: savedOwner._id, name: savedOwner.name, email: savedOwner.email },
            process.env.JWT_SECRET || 'fallback_secret', // Ideally, define JWT_SECRET in .env
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            owner: {
                id: savedOwner._id,
                name: savedOwner.name,
                email: savedOwner.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login Owner
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if owner exists
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: owner._id, name: owner.name, email: owner.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            owner: {
                id: owner._id,
                name: owner.name,
                email: owner.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
