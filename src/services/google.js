import { OAuth2Client } from 'google-auth-library';
import { userModel } from '../db';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
// const GoogleStrategy = GoolePassport.Strategy;
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_KEY,
//       callbackURL: 'http://localhost:5000/api/google/login',
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       // const isRegister = await userModel.findByEmail(payload.email);
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );
// async function verify(credential) {
//   const client = new OAuth2Client(process.env.ClIENT_ID);
//   const ticket = await client.verifyIdToken({
//     idToken: credential,
//     audience: process.env.ClIENT_ID,
//   });
//   const payload = ticket.getPayload();
//   const { email, name } = payload;
//   const isRegister = await userModel.findByEmail(payload.email);
//   return { isRegister, email, fullName: name };
// }

//https://yohanpro.com/posts/codereview
//https://uju-tech.tistory.com/entry/Nodejs-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0-google

//clientid : 196598776648-dbu1p15dcgeotoi1rirs6eu63v3l5qom.apps.googleusercontent.com
// pw: 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

// export default verify;
