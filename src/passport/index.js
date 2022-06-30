import passport from "passport";
import local from './strategies/local-strategy';
import kakao from './strategies/kakao-strategy';
import google from './strategies/google-strategy'

module.exports = () => {
    passport.use(local);    // local strategy 사용
    passport.use(kakao);    // kakao strategy 사용
    passport.use(google);   // google strategy 사용
}