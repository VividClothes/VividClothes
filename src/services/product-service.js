import { productModel } from '../db';

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }

    // 상품 등록
    async addProduct(productInfo) {
        const createdNewProduct = await this.productModel.create(productInfo);

        return createdNewProduct;
    }

    // 전체 상품 조회
    async getProducts() {
        const products = await this.productModel.findAll();

        return products;
    }

    // 카테고리별 상품 조회
    async getProductByCategory(categoryId) {
        // 우선 해당 카테고리의 상품 정보가 db에 존재하는지 확인
        const product = await this.productModel.findByCategory(categoryId);
        if (!product) {
            throw new Error(
                '해당 카테고리에 상품이 없습니다.'
            );
        }

        return product;
    }

    // 특정 상품 조회
    async getProductById(productId) {
        // 우선 해당 상품이 db에 존재하는지 확인
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new Error(
                '해당 상품이 존재하지 않습니다. 다시 확인해 주세요.'
            );
        }

        return product;
    }

    // 상품 정보 수정
    async setProduct(productId, update) {
        const product = await this.productModel.update({ productId, update });

        return product;
    }

    // 상품 정보 삭제
    async deleteProduct(productId) {
        const product = await this.productModel.delete(productId);

        return product;
    }
}

const productService = new ProductService(productModel);

export { productService };