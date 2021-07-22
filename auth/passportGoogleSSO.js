const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//const GOOGLE_CALLBACK_URL = "https://heliot.netlify.app/auth/user/";
const GOOGLE_CALLBACK_URL = "http://localhost:8080/auth/user/";


passport.use(
  new GoogleStrategy(
    {
      clientID: "662618426239-u770377l0a41o3390e07fhca23clqbh9.apps.googleusercontent.com",
      clientSecret: "WrFGLvztrz4vbDp7POiw5574",
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const user = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      if (user) return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  cb(null, user);
});