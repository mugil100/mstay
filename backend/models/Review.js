/**
 * models/Review.js - Review and rating left by a student for a listing
 * TODO: Analytics module will aggregate these to compute listing scores.
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing',
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            trim: true,
        },
        isModerated: {
            type: Boolean,
            default: false,
            // TODO: Admin moderation pipeline flag
        },
        isFlagged: {
            type: Boolean,
            default: false,
            // TODO: Set by AI content moderation or admin action
        },
    },
    { timestamps: true }
);

// A student can only review a listing once
reviewSchema.index({ student: 1, listing: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
