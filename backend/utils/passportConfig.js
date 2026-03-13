const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback', // Relative path
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            const name = profile.displayName;

            if (!email) return done(new Error('No email from Google'), null);

            // Find existing user or create one (Google users get role: owner for this portal)
            let user = await User.findOne({ email });

            if (!user) {
                user = await User.create({
                    name,
                    email,
                    googleId: profile.id,
                    role: 'owner',
                    // No password field — Google-only account
                });
            } else if (!user.googleId) {
                // Existing email account — link Google ID to it
                user.googleId = profile.id;
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

module.exports = passport;
