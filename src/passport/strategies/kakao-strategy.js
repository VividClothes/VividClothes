import { Strategy } from "passport-kakao";
import { userModel } from '../../db';
import jwt from 'jsonwebtoken';

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

// 카카오 로그인에 사용할 필드 설정
const config = {
    clientID: process.env.KAKAO_JS_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
};

// kakao strategy
const kakao = new Strategy(config, async (accessToken, refreshToken, profile, done) => {
    try {
        const { provider, id, username } = profile;

        let user = await userModel.findOneUser({ SNS: { 'kakao': id } });
        if (!user) {
            user = await userModel.create({
                email: profile._json.kakao_account.email || provider + id,
                fullName: username,
                SNS: {
                    kakao: id
                }
            });
        }

        // 이메일 암호화
        const hashedEmail = crypto.createHash('sha512').update(email).digest('base64');

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

export default kakao;