const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false   // Optional — Google OAuth users have no password
    },
    googleId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["student", "owner", "admin"],
        default: "owner"  // This portal is PG-owner only
    },
    phone: String,
    profileImage: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
