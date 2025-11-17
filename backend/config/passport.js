const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Helper to get base URL
const getBaseUrl = () => {
  // Priority: BACKEND_URL > PRODUCTION_BACKEND_URL (if in production) > default
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.PRODUCTION_BACKEND_URL || process.env.BACKEND_URL || 'https://your-backend-domain.com';
  }
  return 'http://localhost:5000';
};

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `${getBaseUrl()}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User exists, update last login
          await user.updateLastLogin();
          return done(null, user);
        }

        // Check if user exists with this email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User exists but doesn't have Google ID, link it
          user.googleId = profile.id;
          if (profile.photos && profile.photos[0]) {
            user.avatar = profile.photos[0].value;
          }
          await user.save();
          await user.updateLastLogin();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
        });

        await user.updateLastLogin();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || `${getBaseUrl()}/api/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists with this Facebook ID
        let user = await User.findOne({ facebookId: profile.id });

        if (user) {
          // User exists, update last login
          await user.updateLastLogin();
          return done(null, user);
        }

        // Check if user exists with this email
        if (profile.emails && profile.emails[0]) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // User exists but doesn't have Facebook ID, link it
            user.facebookId = profile.id;
            if (profile.photos && profile.photos[0]) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
            await user.updateLastLogin();
            return done(null, user);
          }
        }

        // Create new user
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@facebook.com`,
          fullName: profile.displayName,
          avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
        });

        await user.updateLastLogin();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Helper function to generate token and redirect
const generateTokenAndRedirect = (user, res, frontendUrl) => {
  const token = generateToken(user._id);
  const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    avatar: user.avatar,
  }))}`;
  res.redirect(redirectUrl);
};

module.exports = {
  passport,
  generateTokenAndRedirect,
};

