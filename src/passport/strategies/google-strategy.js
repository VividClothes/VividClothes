import { Strategy } from 'passport-google-oauth20';
import { userModel } from '../../db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

// 구글 로그인에 사용할 필드 설정
const config = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    scope: ['profile', 'email']
};

// google strategy
const google = new Strategy(config, async (accessToken, refreshToken, profile, done) => {
    try {
        const { id, name, emails } = profile;
        const email = emails[0].value;
        const fullName = name.familyName + name.givenName;

        let user = await userModel.findOneUser({ $or: [{ email: email }, { SNS: { 'google': id } }] });
        if (!user) {
            // user가 없으면 새 user 생성
            user = await userModel.create({
                email: email,
                fullName: fullName,
                SNS: {
                    google: id
                }
            });
        }
        else {
            // 기존 user가 있을 경우 SNS에 google id 추가
            const userId = user._id;
            const SNS = {
                ...user.SNS,
                'google': id
            };

            user = await userModel.update({
                userId,
                update: {
                    SNS: SNS
                },
            });
        }

        // 이메일 암호화
        const hashedEmail = crypto.createHash('sha512').update(user.email).digest('base64');

        // 유저 id와 role을 jwt 토큰에 담음
        const token = jwt.sign(
            { userId: user._id, userRole: user.role },
            secretKey
        );
        const userRole = user.role;

        done(null, { token, userRole, hashedEmail });
    } catch (err) {
        done(err, null);
    }
})

export default google;