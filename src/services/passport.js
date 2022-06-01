import passport from 'passport';
import kakao from '../config/kakao';
import { UserModel } from '../db';

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findByEmail(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  kakao();
};
