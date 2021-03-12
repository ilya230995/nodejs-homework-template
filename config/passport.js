const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../model/users");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const opts = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      if (!user) {
        return done(new Error("Not authorized"));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);