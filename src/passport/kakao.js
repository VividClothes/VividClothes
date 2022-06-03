import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { userService } from '../services';

export default () => {
    passport.use(
        new KakaoStrategy({
            clientID: process.env.KAKAO_ID,
            callbackURL: '/api/login/kakao/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const user = await userService.getUserByEmail(profile.id);

                if(user){
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;

                    done(null, user);
                }else{
                    const newUser = await userService.addUser({
                        email: profile.id,
                        fullName: profile.username,
                        password: profile.provider
                    });
                    newUser.accessToken = accessToken;
                    newUser.refreshToken = refreshToken;

                    done(null, newUser);
                }
            }catch(error){
                done(error);
            }
        })
    )
};