import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
    // 새 상품 등록
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);

        return createdNewProduct;
    }

    // 모든 상품 출력
    async findAll() {
        const products = await Product.find({})
            .populate({
                path: 'category',
                select: 'categoryName'
            });

        return products;
    }

    // 카테고리별 상품 출력
    async findByCategory(category) {
        const product = await Product.find({ category })
            .populate({
                path: 'category',
                select: 'categoryName'
            });

        return product;
    }

    // objectId를 이용해 특정 상품 출력
    async findById(productId) {
        const product = await Product.findOne({ _id: productId })
            .populate({
                path: 'category',
                select: 'categoryName'
            });

        return product;
    }

    // 상품 정보 수정
    async update({ productId, update }) {
        const filter = { _id: productId };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(filter, update, option);

        return updatedProduct;
    }

    // 상품 정보 삭제
    async delete(productId) {
        const filter = { _id: productId };

        const deleteProduct = await Product.findOneAndDelete(filter);

        return deleteProduct;
    }
}

const productModel = new ProductModel();

export { productModel };