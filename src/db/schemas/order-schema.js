import { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        orderer: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        products: [new Schema({
            product: {
                type: [Schema.Types.ObjectId],
                ref: 'products',
                required: true,
            },
            quantity: Number
        },
        {
            _id: false,
        })],
        priceTotal: {
            type: Number,
            required: true,
        },
        recipient: {
            type: String,
            required: true,
        },
        address: {
            type: new Schema({
                postalCode: String,
                address1: String,
                address2: String
            },
            {
                _id: false,
            }),
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            enum: ['상품 준비중', '상품 배송중', '배송 완료'],
            default: '상품 준비중'
        },
    },
    {
        collection: 'orders',
        timestamps: true,
    }
);

export { OrderSchema };