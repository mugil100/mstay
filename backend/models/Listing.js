/**
 * models/Listing.js - PG / Hostel listing schema
 * Owned by users with role 'owner'.
 * TODO: Add AI-computed fields (recommendationScore, popularityIndex) later.
 */

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Listing title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ['PG', 'Hostel', 'Flat', 'Room'],
            required: true,
        },
        genderAllowed: {
            type: String,
            enum: ['male', 'female', 'any'],
            default: 'any',
        },
        rent: {
            type: Number,
            required: true,
        },
        deposit: {
            type: Number,
            default: 0,
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
            // TODO: Replace with GeoJSON point for geo-queries (Neighborhood Dashboard)
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        amenities: [String], // e.g. ['WiFi', 'AC', 'Laundry', 'Parking']
        images: [String],    // Array of image URLs

        availableFrom: Date,
        isAvailable: {
            type: Boolean,
            default: true,
        },
        totalRooms: Number,
        occupiedRooms: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'inactive'],
            default: 'pending',
            // TODO: Admin moderation logic hooks into this field
        },

        // ─── AI integration placeholders ──────────────────────────────────────
        // recommendationScore: Number,  // Populated by AI recommendation service
        // popularityScore: Number,      // Computed from views, enquiries, reviews
        views: { type: Number, default: 0 },

        averageRating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// TODO: Add text index for full-text search on title, description, address
listingSchema.index({ 'address.city': 1, rent: 1, type: 1 });

module.exports = mongoose.model('Listing', listingSchema);
