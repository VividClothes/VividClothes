// //passport 사용해서 구현

// import passport from 'passport';
// import { Strategy as KakaoStrategy } from 'passport-kakao';
// import { UserModel } from '../db';
// import passport from 'passport';

// module.exports = () => {
//   passport.use(
//     new KakaoStrategy(
//       {
//         clientID: process.env.KAKAO_ID,
//         callbackURL: 'api/login/kakao/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         console.log('kakao profile', profile);
//         try {
//           const exUser = await UserModel.findByEmail(
//             profile._json.kakao_accout_mail
//           );
//           // 이미 가입 된 유저 => 성공
//           if (exUser) {
//             done(null, exUser); //로그인 인증 완료
//           } else {
//             const newUserInfo = {
//               fullName: profile.displayName,
//               email: profile._json && profile._json.kakao_accout_mail,
//               logType: 'kakao',
//             };
//             // provider가 로그인 방식인 거 같은데 db 확인해보고 고쳐야하면 고치기
//             const createdNewUser = await UserModel.create(newUserInfo);
//             done(null, createdNewUser);
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       }
//     )
//   );
// };
