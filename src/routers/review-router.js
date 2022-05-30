import { Router } from 'express';
// import { checkBody, loginRequired, userRoleCheck } from '../middlewares';
// import { productService } from '../services';

const reviewRouter = Router();

// 전체 상품 목록 가져옴
reviewRouter.get('/list', async (req, res, next) => {
    try {
        const productId = req.params;

        res.json(1234)
    } catch (error) {
        next(error);
    }
});

export { reviewRouter };