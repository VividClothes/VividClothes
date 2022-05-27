import { Schema } from 'mongoose';

const ProductSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imagePath: {
            type: [String],
            required: true,
        },
        info: {
            type: String,
            required: true,
        },
        option: {
            type: new Schema({
                size: [String],
                color: [String],
            },
            {
                _id: false,
            }),
            required: true,
        },
    },
    {
        collection: 'products',
        timestamps: true,
    }
);

export { ProductSchema };