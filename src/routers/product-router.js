import { Router } from 'express';
import { checkBody, loginRequired, userRoleCheck } from '../middlewares';
import { productService, reviewService } from '../services';

const productRouter = Router();

// 상품 등록 api
// 로그인여부 및 유저role 확인하는 미들웨어 추가
productRouter.post('/register',
    loginRequired,
    userRoleCheck,
    checkBody,
    async (req, res, next) => {
        try {
            // req.body에서 데이터 가져와 변수에 할당
            const { productName, category, price, imagePath, info, size, color } = req.body;

            // 위 데이터를 상품 db에 추가하기
            const newProduct = await productService.addProduct({
                productName,
                category,
                price,
                imagePath,
                info,
                option: {
                    size,
                    color
                }
            });

            // 추가된 상품의 db 데이터를 프론트에 다시 보내줌
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
);

// 홈화면에 표시할 최신순 전체 상품 목록 가져옴
productRouter.get('/main/recent', async (req, res, next) => {
    try {
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);

        const products = await productService.getProducts(page, perPage);

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 홈화면에 표시할 상품 목록 가져옴(인기 상위 4개)
productRouter.get('/main', async (req, res, next) => {
    try {
        const products = await productService.getPopularAndRecent();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 카테고리별 상품 조회
productRouter.get('/category/:categoryId', async (req, res, next) => {
    try {
        // req에서 데이터 가져옴
        const { categoryId } = req.params;
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);

        // categoryId를 기준으로 Products DB 조회
        const products = await productService.getProductByCategory(categoryId, page, perPage);

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 특정 상품 조회
productRouter.get('/id/:productId', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { productId } = req.params;

        // id를 기준으로 DB 조회
        const product = await productService.getProductById(productId);
        const reviews = await reviewService.getReviewByProduct(productId);

        res.status(200).json({ product, reviews });
    } catch (error) {
        next(error);
    }
});

// 키워드 검색
productRouter.get('/search/:keyword', async (req, res, next) => {
    try {
        const { keyword } = req.params;
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);

        const products = await productService.searchKeyword(keyword, page, perPage);

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 상품 정보 수정
productRouter.put('/update/:productId',
    loginRequired,
    userRoleCheck,
    checkBody,
    async (req, res, next) => {
        try {
            // req의 params와 body에서 데이터 가져옴
            const { productId } = req.params;
            const { productName, category, price, imagePath, info, size, color } = req.body;

            // 데이터를 상품 db에 반영하기
            const updateProduct = await productService.setProduct(productId, {
                productName,
                category,
                price,
                imagePath,
                info,
                option: {
                    size,
                    color
                }
            });

            res.status(201).json(updateProduct);
        } catch (error) {
            next(error);
        }
    }
);

// 상품 정보 삭제
productRouter.delete('/delete/:productId',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            const { productId } = req.params;

            const deleteProduct = await productService.deleteProduct(productId);

            res.status(200).json(deleteProduct);
        } catch (error) {
            next(error);
        }
    }
);

export { productRouter };