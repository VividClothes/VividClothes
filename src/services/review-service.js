import { reviewModel } from '../db';
import { orderService, imageService } from './index';

class ReviewService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }

    // 리뷰 등록
    async addReview(userRole, orderId, reviewInfo) {
        // orderId와 productId로 주문한 상품 정보 조회
        const orderProduct = await orderService.getOrderProduct(
            userRole,
            reviewInfo.writer,
            orderId,
            reviewInfo.productId
        );

        if (orderProduct.orderer != reviewInfo.writer) {
            throw new Error(
                '리뷰를 등록할 수 없습니다.'
            )
        }

        // 옵션 정보 재할당
        reviewInfo.option = orderProduct.option;

        const createdNewReview = await this.reviewModel.create(reviewInfo);
        orderService.updateHasReview(orderId, reviewInfo.productId);

        return createdNewReview;
    }

    // 유저별 리뷰 조회
    async getReviewByUser(userId, page, perPage) {
        const reviews = await this.reviewModel.findByUser(userId, page, perPage);
        if (reviews.datas.length < 1) {
            throw new Error(
                '작성한 리뷰가 없습니다.'
            );
        }

        return reviews;
    }

    // 상품별 리뷰 조회
    async getReviewByProduct(productId, page, perPage) {
        const reviews = await this.reviewModel.findByProduct(productId, page, perPage);
        if (reviews.datas.length < 1) {
            throw new Error(
                '작성된 리뷰가 없습니다.'
            );
        }

        return reviews;
    }

    // 특정 리뷰 조회
    async getReviewById(reviewId) {
        // 우선 해당 상품이 db에 존재하는지 확인
        const review = await this.reviewModel.findById(reviewId);
        if (!review) {
            throw new Error(
                '해당 리뷰가 존재하지 않습니다. 다시 확인해주세요.'
            );
        }

        return review;
    }

    // 리뷰 수정
    async setReview(userId, reviewId, update) {
        // reviewId로 리뷰 조회
        const originalReview = await this.getReviewById(reviewId);

        // 작성자가 아니라면 에러 발생
        if (originalReview.writer != userId) {
            throw new Error(
                '접근할 수 없는 사용자입니다. 다시 로그인해 주세요.'
            )
        }

        // 기존 imagePath와 비교해 삭제된 이미지는 s3에서도 삭제
        originalReview.imagePath.forEach(path => {
            if (!update.imagePath.includes(path)) {
                imageService.imageDelete([path]);
            }
        });

        const review = await this.reviewModel.update({ reviewId, update });

        return review;
    }

    // 리뷰 삭제
    async deleteReview(userRole, userId, reviewId) {
        // reviewId로 리뷰 조회
        const originalReview = await this.getReviewById(reviewId);

        // 관리자나 작성자가 아니라면 에러 발생
        if (userRole != 'admin-user' && originalReview.writer != userId) {
            throw new Error(
                '접근할 수 없는 사용자입니다. 다시 로그인해 주세요.'
            )
        }

        const review = await this.reviewModel.delete(reviewId);

        if (review.imagePath.length > 0) {
            imageService.imageDelete(review.imagePath);
        }

        return review;
    }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };