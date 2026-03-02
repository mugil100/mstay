const mongoose = require('mongoose');

const pgListingSchema = new mongoose.Schema({
    pgName: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    rent: { type: Number, required: true },
    genderPreference: { type: String, required: true, enum: ['Boys', 'Girls', 'Co-ed'] },
    description: { type: String },
    ownerId: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PgListing', pgListingSchema);
