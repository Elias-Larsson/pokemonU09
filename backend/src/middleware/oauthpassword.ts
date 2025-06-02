import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleUser from "../models/oauthSchema";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await GoogleUser.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new GoogleUser({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            profilePhoto: profile.photos?.[0]?.value || "",
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        return done(error, undefined);
      }
    }
  )
);
 
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
