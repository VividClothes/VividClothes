import { Schema } from 'mongoose';

const ReviewSchema = new Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        option: {
            size: String,
            color: String,
        },
        content: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        imagePath: {
            type: [String],
            required: true,
        }
    },
    {
        collection: 'reviews',
        timestamps: true,
    }
);

export { ReviewSchema };