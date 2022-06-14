// import passport from 'passport';
// import { Strategy as KakaoStrategy } from 'passport-kakao';
// import { userService } from '../services';

// export default () => {
//     passport.use(
//         new KakaoStrategy({
//             clientID: process.env.KAKAO_ID,
//             callbackURL: '/api/login/kakao/callback'
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try{
//                 const { provider, id, username} = profile;
//                 const user = await userService.getUserByEmail(id);
                
//                 if(user){
//                     done(null, user);
//                 }else{
//                     const newUser = await userService.addUser({
//                         email: id,
//                         fullName: username,
//                         password: provider+id
//                     });

//                     done(null, newUser);
//                 }
//             }catch(error){
//                 done(error);
//             }
//         })
//     )
// };