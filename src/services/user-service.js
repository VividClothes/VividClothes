import { userModel } from '../db';
import bcrypt from 'bcrypt';
import axios from 'axios';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    // 유저 인증
    async checkUser(filter, password) {
        // 우선 해당 이메일의 사용자 정보가 db에 존재하는지 확인
        const user = await this.userModel.findOneUser(filter);
        if (!user) {
            throw new Error(
                '가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
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

        return user;
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserInfo = { fullName, email, password: hashedPassword };

        // db에 저장
        await this.userModel.create(newUserInfo);

        // 로그인 api 호출
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/login',
            data: {
                email,
                password
            }
        });

        return res.data;
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

        // 유저 확인
        const user = await this.checkUser({ _id: userId }, currentPassword);

        // 비밀번호 암호화
        const { password } = toUpdate;
        if (password) {
            const newPasswordHash = await bcrypt.hash(password, 10);
            toUpdate.password = newPasswordHash;
        }

        // 수정된 유저 정보 db에 반영
        user = await this.userModel.update({
            userId,
            update: toUpdate,
        });

        return user;
    }

    // 회원 탈퇴 - 유저 정보 삭제
    async deleteUser(userInfoRequired) {
        const { userId, currentPassword } = userInfoRequired;

        // 유저 확인
        await this.checkUser({ _id: userId }, currentPassword);

        await this.userModel.delete(userId);
    }
}

const userService = new UserService(userModel);

export { userService };