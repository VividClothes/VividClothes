import { userModel } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// jwt secretKey Setting
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    // 회원가입
    async addUser(userInfo) {
        // 객체 destructuring
        const { email, fullName, password } = userInfo;

        // 이메일 중복 확인
        const user = await this.userModel.findOneUser({ email });
        if (user) {
            throw new Error(
                '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
            );
        }

        // 비밀번호 암호화
        const hashedPassword = bcrypt.hash(password, 10);
        const newUserInfo = { fullName, email, password: hashedPassword };

        // db에 저장
        await this.userModel.create(newUserInfo);

        // 회원 가입 시 자동 로그인 구현
        return this.getUserToken(userInfo);
    }

    // 로그인
    async getUserToken(loginInfo) {
        const { email, password } = loginInfo;

        // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
        const user = await this.userModel.findOneUser({ email });
        if (!user) {
            throw new Error(
                '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
            );
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
        if (!isPasswordCorrect) {
            throw new Error(
                '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
            );
        }

        // 이메일 암호화
        const hashedEmail = bcrypt.hash(email, 10);

        // 유저 id와 role을 jwt 토큰에 담음
        const token = jwt.sign(
            { userId: user._id, userRole: user.role },
            secretKey
        );
        const userRole = user.role;

        return { token, userRole, hashedEmail };
    }

    // 전체 유저 목록 출력
    async getUsers() {
        const users = await this.userModel.findAll();
        return users;
    }

    // 특정 유저 찾기 - email, objectId
    async getUser(filter) {
        const user = await this.userModel.findOneUser(filter);
        if (!user) {
            throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        return await user;
    }

    // 유저 정보 수정 - 비밀번호 확인 후 수정
    async setUser(userInfoRequired, toUpdate) {
        const { userId, currentPassword } = userInfoRequired;

        // 우선 해당 id의 유저가 db에 있는지 확인
        let user = await this.userModel.findOneUser({ _id: userId });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(currentPassword, correctPasswordHash);
        if (!isPasswordCorrect) {
            throw new Error(
                '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
            );
        }

        // 비밀번호 암호화
        const { password } = toUpdate;
        if (password) {
            const newPasswordHash = bcrypt.hash(password, 10);
            toUpdate.password = newPasswordHash;
        }

        // 수정된 유저 정보 db에 반영
        user = await this.userModel.update({
            userId,
            update: toUpdate,
        });

        return user;
    }

    //비밀번호 업데이트
    // async updatePassword(email, password) {
    //   user = await this.userModel.update({
    //     email,
    //     password: toUpdate,
    //   });

    //   return user;
    // }

    // 이건 뭐하는 함수일까..?
    async createAuth(newUserInfo) {
        const createdNewAuth = await this.authModel.create(newUserInfo);
        return createdNewAuth;
    };

    // 회원 탈퇴 - 유저 정보 삭제
    async deleteUser(userInfoRequired) {
        const { userId, currentPassword } = userInfoRequired;

        let user = await this.userModel.findOneUser({ _id: userId });
        if (!user) {
            throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(currentPassword, correctPasswordHash);
        if (!isPasswordCorrect) {
            throw new Error(
                '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
            );
        }

        await this.userModel.delete(userId);
    }
}

const userService = new UserService(userModel);

export { userService };