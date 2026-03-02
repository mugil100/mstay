/**
 * models/Notification.js - In-app notifications for all user roles
 * TODO: Extend with push notification support (FCM/APNs) for mobile.
 */

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [
                'enquiry_received',
                'enquiry_responded',
                'listing_approved',
                'listing_rejected',
                'new_review',
                'roommate_match',   // TODO: Triggered by AI matching service
                'admin_alert',
                'system',
            ],
            required: true,
        },
        title: String,
        message: String,
        isRead: {
            type: Boolean,
            default: false,
        },
        link: String, // Frontend deep link for navigation
        referenceId: mongoose.Schema.Types.ObjectId, // ID of related entity
        referenceModel: String, // 'Listing', 'Enquiry', etc.
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
