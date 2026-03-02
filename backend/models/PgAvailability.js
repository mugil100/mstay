const mongoose = require('mongoose');

const pgAvailabilitySchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgRoom', required: true },
    availableBeds: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Available', 'Full', 'Limited'] },
    lastUpdatedOn: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PgAvailability', pgAvailabilitySchema);
