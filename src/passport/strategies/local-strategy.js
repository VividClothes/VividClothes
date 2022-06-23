import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from "../../services";

// 로컬 로그인에 사용할 필드 설정
const config = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true     // Strategy의 콜백으로 req도 사용
};

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

// 로컬 strategy
const local = new Strategy(config, async (req, email, password, done) => {
    try {
        // 유저 확인
        const user = await userService.checkUser({ email }, password);

        // 이메일 암호화
        const hashedEmail = await bcrypt.hash(email, 10);

        // 유저 id와 role을 jwt 토큰에 담음
        const token = jwt.sign(
            { userId: user._id, userRole: user.role },
            secretKey
        );
        const userRole = user.role;

        // jwt 토큰과 userRole, hashedEmail을 req에 담음
        req.token = { token, userRole, hashedEmail };

        done(null, user);
    } catch (err) {
        done(err, null);
    }
})

export default local;