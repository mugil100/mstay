/**
 * models/User.js - User schema for MOV Stay
 * Supports three roles: student, owner, admin
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false, // Never return password in queries
        },
        role: {
            type: String,
            enum: ['student', 'owner', 'admin'],
            default: 'student',
        },
        phone: {
            type: String,
            trim: true,
        },
        profilePicture: {
            type: String, // URL to profile image
            default: '',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },

        // ─── Student-specific fields ──────────────────────────────────────────
        // TODO: Extend when student AI profiling module is integrated
        university: String,
        preferredArea: String,

        // ─── Owner-specific fields ────────────────────────────────────────────
        businessName: String,
        gstNumber: String,

        // ─── Admin flags ──────────────────────────────────────────────────────
        // TODO: Permissions array for granular admin access control
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
