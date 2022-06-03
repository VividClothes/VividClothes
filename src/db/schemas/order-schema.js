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
            option: {
                type: {
                    size: String,
                    color: String,
                },
                required: true,
                _id: false,
            },
            quantity: {
                type: Number,
                required: true,
            },
            hasReview: {
                type: Boolean,
                default: false,
            },
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
            required: true,
        },
    },
    {
        collection: 'orders',
        timestamps: true,
    }
);

export { OrderSchema };