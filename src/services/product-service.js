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

    // 상품 정보 수정

    // 상품 정보 삭제
}

const productService = new ProductService(productModel);

export { productService };