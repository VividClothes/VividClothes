import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from "../../services";

// 로컬 로그인에 사용할 필드 설정
const config = {
    usernameField: 'email',
    passwordField: 'password'
};

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

// 로컬 strategy
const local = new Strategy(config, async (email, password, done) => {
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

        done(null, { token, userRole, hashedEmail });
    } catch (err) {
        done(err, null);
    }
})

export default local;