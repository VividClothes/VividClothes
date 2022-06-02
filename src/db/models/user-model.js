import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';
import { AuthSchema } from '../schemas/auth-schema';
const User = model('users', UserSchema);
const Auth = model('auth', AuthSchema);
export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
  async createAuth(userInfo) {
    const createdNewAuth = await Auth.create(userInfo);
    return createdNewAuth;
  }
  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async updatePassword({ email, password }) {
    const updatePassword = await User.updateOne(
      { email },
      {
        password: hashPassword(password),
      }
    );
  }
  async delete(userId) {
    const filter = { _id: userId };
    await User.deleteOne(filter);
  }
}

const userModel = new UserModel();

export { userModel };
