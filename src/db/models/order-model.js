import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
    // 주문 추가
    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);

        return createdNewOrder;
    }

    // 모든 주문 조회
    async findAll() {
        const orders = await Order.find({})
            .populate([
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
                        'price'
                    ]
                }
            ]);

        return orders;
    }

    // 유저별 주문 조회
    async findByUser(userId) {
        const orders = await Order.find({ orderer: userId })
            .populate([
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
                        'price'
                    ]
                }
            ]);

        return orders;
    }

    // objectId를 이용해 특정 주문 조회
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId })
            .populate([
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
                        'price'
                    ]
                }
            ]);

        return order;
    }

    // 주문 내역 및 상태 변경
    async update(orderId, update) {
        const filter = { _id: orderId };
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