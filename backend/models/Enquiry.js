/**
 * models/Enquiry.js - Enquiry made by a student on a listing
 */

const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
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
        message: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'responded', 'closed'],
            default: 'pending',
        },
        // TODO: Link to Chat module - each enquiry can spawn a chat thread
        chatThreadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
