import { Strategy } from "passport-kakao";
import { userModel } from '../../db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

// 카카오 로그인에 사용할 필드 설정
const config = {
    clientID: process.env.KAKAO_JS_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_REDIRECT_URI
};

// kakao strategy
const kakao = new Strategy(config, async (accessToken, refreshToken, profile, done) => {
    try {
        const { provider, id, username } = profile;
        // 사용자가 email 정보 제공에 동의하지 않았을 경우 kakao+id로 이메일 지정
        const email = profile._json.kakao_account.email || provider + id;

        let user = await userModel.findOneUser({ $or: [{ email: email }, { SNS: { 'kakao': id } }] });
        if (!user) {
            // user가 없으면 새 user 생성
            user = await userModel.create({
                email: email,
                fullName: username,
                SNS: {
                    kakao: id
                }
            });
        }
        else {
            // 기존 user가 있을 경우 SNS에 kakao id 추가
            const userId = user._id;
            const SNS = {
                ...user.SNS,
                'kakao': id
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

export default kakao;