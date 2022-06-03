const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = () => {
    passport.use(
        new KakaoStrategy({
            clientID: process.env.KAKAO_ID,
            callbackURL: '/api/login/kakao/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            try{
                console.log(profile)
                done(null, profile)
            }catch(error){
                done(error);
            }
        })
    )
};