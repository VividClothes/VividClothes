import { orderModel } from '../db';

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    // 주문 추가
    async addOrder(orderInfo) {
        const createdNewOrder = await this.orderModel.create(orderInfo);

        return createdNewOrder;
    }

    // 모든 주문 조회
    async getOrders() {
        const orders = await this.orderModel.findAll();

        return orders;
    }

    // 유저별 주문 내역 조회
    async getOrderByUser(userId) {
        // 우선 해당 유저의 주문 내역이 db에 존재하는지 확인
        const orders = await this.orderModel.findByUser(userId);
        if (!orders) {
            throw new Error(
                '해당 유저의 주문 내역이 없습니다.'
            );
        }

        return orders;
    }

    // 특정 주문 내역 조회
    async getOrderById(orderId) {
        // 우선 해당 주문 내역이 존재하는지 확인
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new Error(
                '해당 주문 내역이 존재하지 않습니다. 다시 확인해 주세요.'
            );
        }

        return order;
    }

    // 주문 정보 삭제 - 주문 취소
    async deleteOrder(orderId) {
        const order = await this.orderModel.delete(orderId);

        return order;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };