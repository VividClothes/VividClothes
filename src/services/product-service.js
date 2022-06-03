import { productModel } from '../db';
import { categoryService, imageService } from './index'

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }

    // 상품 등록
    async addProduct(productInfo) {
        // 입력된 카테고리를 카테고리 DB에서 검색 후 변수에 할당
        productInfo.category = await categoryService.getCategoryByName(productInfo.category);

        const createdNewProduct = await this.productModel.create(productInfo);

        return createdNewProduct;
    }

    // 전체 상품 조회
    async getProducts(page, perPage) {
        const products = await this.productModel.findAll(page, perPage);

        return products;
    }

    // 홈화면 상품 조회(인기 상품 및 최신 상품)
    async getPopularAndRecent() {
        const popularProducts = await this.productModel.findPopular(4);
        const recentProducts = await this.productModel.findRecent(8);

        return { popularProducts, recentProducts };
    }

    // 카테고리별 상품 조회
    async getProductByCategory(categoryId, page, perPage) {
        // 우선 해당 카테고리의 상품 정보가 db에 존재하는지 확인
        const products = await this.productModel.findByCategory(categoryId, page, perPage);

        return products;
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

    // 키워드 검색
    async searchKeyword(keyword, page, perPage){
        const products = await this.productModel.findByKeyword(keyword, page, perPage);

        return products;
    }

    // 상품의 orderCount 증감
    async increaseOrderCount(productId, amount) {
        const product = await this.productModel.update(
            productId,
            { $inc: { "orderCount": amount } }
        );

        return product;
    }

    // 상품 정보 수정
    async setProduct(productId, update) {
        // 입력된 카테고리를 카테고리 DB에서 검색 후 변수에 할당
        update.category = await categoryService.getCategoryByName(update.category);

        // 기존 imagePath와 비교해 삭제된 이미지는 s3에서도 삭제
        const originalproduct = await this.getProductById(productId);
        originalproduct.imagePath.forEach(path => {
            if (!update.imagePath.includes(path)) {
                imageService.imageDelete([path]);
            }
        });

        const product = await this.productModel.update(productId, update);

        return product;
    }

    // 상품 정보 삭제
    async deleteProduct(productId) {
        const product = await this.productModel.delete(productId);

        if (product.imagePath.length > 0) {
            imageService.imageDelete(product.imagePath);
        }

        return product;
    }
}

const productService = new ProductService(productModel);

export { productService };