import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
import { CategorySchema } from '../schemas/category-schema';
import { pagination } from '../../utils/pagination';

const Product = model('products', ProductSchema);
const Category = model('categories', CategorySchema);

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

const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN;

export class ProductModel {
    // 새 상품 등록
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);

        return createdNewProduct;
    }

    // 모든 상품 최신순 조회
    async findAll(page, perPage) {
        const products = await pagination(page, perPage, Product, {}, {}, { createdAt: -1 });

        // imagePath에 cloudfront 도메인 연결
        products.datas =  products.datas.map(data => {
            const newImagePath = data.imagePath.map(imgPath => {
                if(imgPath.includes('http')){
                    return imgPath;
                }
                return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=300&f=webp`;
            })
            data.imagePath = newImagePath;

            return data;
        })

        return products;
    }

    // n개 카테고리별 Best 상품 조회
    async findPopular(count) {
        let products = await Product
            .aggregate([
                {
                    $sort: sort
                },
                {
                    $group: {
                        _id: '$category',
                        product: { $first: "$$ROOT" }
                    }
                }
            ])
            .sort('-product.orderCount -product.createAt')
            .limit(count);
        await Category.populate(products, 'product.category');
        
        products = products.map(item => {
            const newImagePath = item.product.imagePath.map(imgPath => {
                if(imgPath.includes('http')){
                    return imgPath;
                }
                return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=768&f=webp`;
            })
            item.product.imagePath = newImagePath;

            return item;
        })

        return products;
    }

    // 카테고리별 상품 출력
    async findByCategory(category, page, perPage) {
        const filter = { category };

        const products = await pagination(page, perPage, Product, filter, select, sort);
        products.datas =  products.datas.map(data => {
            const newImagePath = data.imagePath.map(imgPath => {
                if(imgPath.includes('http')){
                    return imgPath;
                }
                return `${CLOUDFRONT_DOMAIN}/${imgPath}?h=200&f=webp`;
            })
            data.imagePath = newImagePath;

            return data;
        })

        return products;
    }

    // objectId를 이용해 특정 상품 출력
    async findById(productId) {
        const product = await Product.findOne({ _id: productId })
            .populate(populate);
        
        const newImagePath = product.imagePath.map(imgPath => {
            if(imgPath.includes('http')){
                return imgPath;
            }
            return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=768&f=webp`;
        })
        product.imagePath = newImagePath;

        return product;
    }

    // 상품명, info, color 옵션에서 keyword 검색
    async findByKeyword(keyword, page, perPage) {
        const filter = { $text: { $search: keyword } };
        const sort = { score: { $meta: 'textScore' } };

        const products = await pagination(page, perPage, Product, filter, {}, sort);
        products.datas =  products.datas.map(data => {
            const newImagePath = data.imagePath.map(imgPath => {
                if(imgPath.includes('http')){
                    return imgPath;
                }
                return `${CLOUDFRONT_DOMAIN}/${imgPath}?h=200&f=webp`;
            })
            data.imagePath = newImagePath;

            return data;
        })

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