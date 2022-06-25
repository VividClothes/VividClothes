import passport from "passport";
import local from './strategies/local-strategy';
import kakao from './strategies/kakao-strategy';

module.exports = () => {
    passport.use(local);    // local strategy 사용
    passport.use(kakao);    // kakao strategy 사용
}