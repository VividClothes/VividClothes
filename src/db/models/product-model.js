import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
import { pagination } from '../../utils/pagination';

const Product = model('products', ProductSchema);

const select = {
    _id: true,
    productName: true,
    price: true,
    imagePath: true,
    info: true,
};
const sort = {
    orderCount: -1,
    createdAt: -1,
};
const populate = {
    path: 'category',
    select: 'categoryName'
};

export class ProductModel {
    // 새 상품 등록
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);

        return createdNewProduct;
    }

    // 모든 상품 조회
    async findAll(page, perPage) {
        const products = pagination(page, perPage, Product, {}, select, sort);

        return products;
    }

    // 인기 상위 n개 상품 조회
    async findPopular(count) {
        // const groupByCategory = await Product
        //     .aggregate([
        //         {
        //             $group: {
        //                 _id: '$category',
        //                 maxCount: {$max: '$orderCount'}
        //             }
        //         }
        //     ])
        //     .sort('-maxCount')
        //     .limit(4);
        // const popularProducts = await Category.populate(groupByCategory, {path: '_id', select: 'categoryName'});
        const products = await Product.find({})
            .sort('-orderCount')
            .limit(count)
            .populate(populate);

        return products;
    }

    // 최신 n개 상품 조회
    async findRecent(count) {
        const products = await Product.find({})
            .sort('-createdAt')
            .limit(count)
            .populate(populate);

        return products;
    }

    // 카테고리별 상품 출력
    findByCategory(category, page, perPage) {
        const filter = { category };

        const products = pagination(page, perPage, Product, filter, select, sort);

        return products;
    }

    // objectId를 이용해 특정 상품 출력
    async findById(productId) {
        const product = await Product.findOne({ _id: productId })
            .populate(populate);

        return product;
    }

    // 상품명, info, color 옵션에서 keyword 검색
    async findByKeyword(keyword, page, perPage) {
        const filter = { $text: { $search: keyword } };
        const sort = { score: { $meta: 'textScore' } };
        
        const products = pagination(page, perPage, Product, filter, {}, sort);

        return products;
    }

    // 상품 정보 수정
    async update(productId, update) {
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