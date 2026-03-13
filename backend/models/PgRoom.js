const mongoose = require('mongoose');

const PgRoomSchema = new mongoose.Schema({
    pgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PgListing",
        required: true
    },
    roomType: {
        type: String,
        enum: ["Single", "Double", "Triple", "Dormitory"]
    },
    sharingCapacity: { type: Number, min: 0 },
    totalBeds: { type: Number, min: 0 },
    roomRent: { type: Number, min: 0 },
    acAvailable: Boolean
});

module.exports = mongoose.model('PgRoom', PgRoomSchema);
