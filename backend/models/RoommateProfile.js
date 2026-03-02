/**
 * models/RoommateProfile.js - Student profile for roommate matching
 * TODO: AI roommate compatibility scoring will use these fields as input vectors.
 */

const mongoose = require('mongoose');

const roommateProfileSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // One profile per student
        },
        age: Number,
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer_not_to_say'],
        },
        university: String,
        budgetMin: Number,
        budgetMax: Number,
        preferredArea: String,
        moveInDate: Date,

        // Lifestyle preferences (inputs for AI matching)
        // TODO: These will be fed into ML compatibility model
        sleepSchedule: {
            type: String,
            enum: ['early_bird', 'night_owl', 'flexible'],
        },
        smokingPolicy: {
            type: String,
            enum: ['ok', 'not_ok', 'indifferent'],
        },
        petsPolicy: {
            type: String,
            enum: ['ok', 'not_ok', 'indifferent'],
        },
        cleanlinessLevel: {
            type: Number,
            min: 1,
            max: 5,
        },
        studyHabits: {
            type: String,
            enum: ['quiet_study', 'group_study', 'flexible'],
        },

        bio: String,
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('RoommateProfile', roommateProfileSchema);
