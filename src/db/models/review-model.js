import { model } from 'mongoose';
import { ReviewSchema } from '../schemas/review-schema';

const Review = model('reviews', ReviewSchema);

export class ReviewModel {
    // 새 리뷰 등록
    async create(reviewInfo) {
        const createdNewReview = await Review.create(reviewInfo);

        return createdNewReview;
    }

    // 상품별 리뷰 조회
    async findByProduct(productId) {
        const reviews = await Review.find({productId})
            .populate([
                {
                    path: 'writer',
                    select: [
                        'email',
                        'fullName'
                    ]
                },
                {
                    path: 'productId',
                    select: 'productName'
                }
            ]);

        return reviews;
    }

    // 특정 리뷰 조회
    async findById(reviewId) {
        const review = await Review.findOne({ _id: reviewId })
            .populate([
                {
                    path: 'writer',
                    select: [
                        'email',
                        'fullName'
                    ]
                },
                {
                    path: 'productId',
                    select: 'productName'
                }
            ]);

        return review;
    }

    // 리뷰 수정
    async update({ reviewId, update }) {
        const filter = { _id: reviewId };
        const option = { returnOriginal: false };

        const updatedReview = await Review.findOneAndUpdate(filter, update, option);

        return updatedReview;
    }

    // 리뷰 삭제
    async delete(reviewId) {
        const filter = { _id: reviewId };

        const deleteReview = await Review.findOneAndDelete(filter);

        return deleteReview;
    }
}

const reviewModel = new ReviewModel();

export { reviewModel };