import { Router } from 'express';
import { checkBody, loginRequired, userRoleCheck } from '../middlewares';
import { reviewService } from '../services';

const reviewRouter = Router();

// 리뷰 등록
reviewRouter.post('/register/:orderId',
    loginRequired,
    checkBody,
    async (req, res, next) => {
        try {
            // req에서 데이터 가져와 변수에 할당
            const writer = req.currentUserId;
            const { orderId } = req.params;
            const { productId, content, rate, imagePath } = req.body;

            // 위 데이터를 리뷰 db에 추가하기
            const newReview = await reviewService.addReview(
                req.currentUserRole,
                orderId,
                {
                    writer,
                    productId,
                    option: {},
                    content,
                    rate,
                    imagePath
                }
            );

            res.status(201).json(newReview);
        } catch (error) {
            next(error);
        }
    }
);

// 유저별 리뷰 조회 - 일반 유저
reviewRouter.get('/list',
    loginRequired,
    async (req, res, next) => {
        try {
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 10);

            const reviews = await reviewService.getReviewByUser(req.currentUserId, page, perPage);

            res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    }
);

// 유저별 리뷰 조회 - 관리자
reviewRouter.get('/list/user/:userId',
    loginRequired,
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 10);

            const reviews = await reviewService.getReviewByUser(userId, page, perPage);

            res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    }
);

// 상품별 리뷰 조회
reviewRouter.get('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);

        const reviews = await reviewService.getReviewByProduct(productId, page, perPage);

        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// 특정 리뷰 조회
reviewRouter.get('/:reviewId', async (req, res, next) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewService.getReviewById(reviewId);

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// 리뷰 수정
reviewRouter.patch('/:reviewId/update',
    loginRequired,
    checkBody,
    async (req, res, next) => {
        try {
            // req에서 데이터 가져와 변수에 할당
            const { reviewId } = req.params;
            const { content, rate, imagePath } = req.body;

            // 위 데이터를 리뷰 db에 추가하기
            const updateReview = await reviewService.setReview(
                req.currentUserId,
                reviewId,
                {
                    content,
                    rate,
                    imagePath
                }
            );

            res.status(201).json(updateReview);
        } catch (error) {
            next(error);
        }
    }
);

// 리뷰 삭제
reviewRouter.delete('/:reviewId/delete',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            const { reviewId } = req.params;

            const deleteReview = await reviewService.deleteReview(
                req.currentUserRole,
                req.currentUserId,
                reviewId
            );

            res.status(200).json(deleteReview);
        } catch (error) {
            next(error);
        }
    }
);

export { reviewRouter };