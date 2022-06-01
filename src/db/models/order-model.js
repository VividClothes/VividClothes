import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { pagination } from '../../utils/pagination';

const Order = model('orders', OrderSchema);

const populate = [
    {
        path: 'orderer',
        select: [
            'email',
            'fullName',
            'phoneNumber'
        ]
    },
    {
        path: 'products.product',
        select: [
            'productName',
            'price',
            'imagePath'
        ]
    }
];

export class OrderModel {
    // 주문 추가
    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);

        return createdNewOrder;
    }

    // 모든 주문 조회
    findAll(page, perPage) {
        const select = {
            _id: true,
            orderer: true,
            products: true,
            priceTotal: true,
            state: true,
        };
        const sort = { createdAt: -1 };

        const orders = pagination(page, perPage, Order, {}, select, sort, populate);

        return orders;
    }

    // 유저별 주문 조회
    findByUser(userId, page, perPage) {
        const filter = { orderer: userId };
        const select = {
            _id: true,
            orderer: true,
            products: true,
            priceTotal: true,
            state: true,
        };
        const sort = { createdAt: -1 };

        const orders = pagination(page, perPage, Order, filter, select, sort, populate);

        return orders;
    }

    // objectId를 이용해 특정 주문 조회
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId })
            .populate(populate);

        return order;
    }

    // 특정 주문의 특정 상품 검색
    async findByProduct(orderId, productId) {
        const order = await Order.findOne(
            { _id: orderId },
            {
                'orderer': true,
                'products': {
                    '$elemMatch': {
                        'product': productId
                    }
                }
            }
        );

        return order;
    }

    // 주문 내역 및 상태 변경
    async update(filter, update) {
        const option = { returnOriginal: false };

        const updateOrder = await Order.findOneAndUpdate(filter, update, option);

        return updateOrder;
    }

    // 전체 주문 취소 - 삭제
    async delete(orderId) {
        const filter = { _id: orderId };

        const deleteOrder = await Order.findOneAndDelete(filter);

        return deleteOrder;
    }
}

const orderModel = new OrderModel();

export { orderModel };