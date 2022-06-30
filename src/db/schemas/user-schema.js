import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: false,    // 소셜로그인의 경우 비밀번호 미입력
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: {
            type: new Schema(
                {
                    postalCode: String,
                    address1: String,
                    address2: String,
                },
                {
                    _id: false,
                }
            ),
            required: false,
        },
        SNS:{
            type: Object,
            required: false,
        },
        role: {
            type: String,
            default: 'basic-user',
        },
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

export { UserSchema };