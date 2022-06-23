import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
    // 유저 한명 찾기 - email, objectId
    async findOneUser(filter){
        const user = await User.findOne(filter);
        return user;
    }

    // 새 유저 정보 저장
    async create(userInfo) {
        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }

    // 전체 유저 찾기
    async findAll() {
        const users = await User.find({});
        return users;
    }

    // 유저 정보 수정
    async update({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    // 유저 정보 삭제
    async delete(userId) {
        const filter = { _id: userId };
        await User.findOneAndDelete(filter);
    }
}

const userModel = new UserModel();

export { userModel };