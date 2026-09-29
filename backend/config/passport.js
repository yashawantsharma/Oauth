const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../model/userModel');

passport.use(
    new GoogleStrategy( 
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },

        async (accessToken, refreshToken, profile, done) => {

            try {

                const email = profile.emails[0].value;

                let user = await User.findOne({
                    email: email
                });

                if (!user) {

                    user = await User.create({
                        name: profile.displayName,
                        email: email,
                        googleId: profile.id
                    });

                } else {

                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }

                }

                return done(null, user);

            } catch (error) {

                return done(error, null);

            }

        }
    )
);

module.exports = passport;