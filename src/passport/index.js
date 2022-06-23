import passport from "passport";
import local from './strategies/local-strategy';

module.exports = () => {
    // local strategy 사용
    passport.use(local);
}