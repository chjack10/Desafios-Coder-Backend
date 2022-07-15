import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/schema/user';

passport.use(
  'register',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      const user = await User.findOne({ email: email });
      if (user) {
        return done(null, false, { message: 'User already exists' });
      }
      const newUser = new User({
        email,
        password,
      });
      await newUser.save();
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
