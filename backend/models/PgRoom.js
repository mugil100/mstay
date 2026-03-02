const mongoose = require('mongoose');

const pgRoomSchema = new mongoose.Schema({
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing', required: true },
    roomType: { type: String, required: true, enum: ['Single', 'Double', 'Triple', 'Dormitory'] },
    sharingCapacity: { type: Number, required: true },
    roomRent: { type: Number, required: true },
    acAvailable: { type: Boolean, default: false },
    totalBeds: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PgRoom', pgRoomSchema);
