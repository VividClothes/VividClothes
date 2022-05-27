import { orderModel } from '../db';
import { userService, productService } from './index';

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    // 주문 추가
    async addOrder(orderInfo) {

        // 유저 검색 후 재할당
        orderInfo.orderer = await userService.getUserById(orderInfo.orderer);

        // 전체 상품 정보 가져온 후 알맞은 상품을 할당
        const allProduct = await productService.getProducts();
        orderInfo.products = orderInfo.products.map(product => ({
            product: allProduct.find(p => p._id == product.productId),
            quantity: product.quantity
        }))

        // orderInfo.products = await Promise.all(
        //     orderInfo.products.map( async product => ({
        //     product: await productService.getProductById(product.productId),
        //     quantity: product.quantity
        // })));

        // 주문 총액 계산
        orderInfo.priceTotal = orderInfo.products.reduce(
            (sum, item) => sum + item.product.price * item.quantity
            , 0);

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
    async getOrderById(userRole, userId, orderId) {
        // 우선 해당 주문 내역이 존재하는지 확인
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new Error(
                '해당 주문 내역이 존재하지 않습니다. 다시 확인해 주세요.'
            );
        }

        // basic-user가 다른 사람의 주문 내역에 접근할 수 없도록 제한
        if (userRole != 'admin-user' && userId != order.orderer._id) {
            throw new Error(
                '접근할 수 없는 사용자입니다. 다시 로그인해 주세요.'
            )
        }

        return order;
    }

    async updateOrder(orderId, stateCode) {
        const state = ['상품 준비중', '상품 배송중', '배송 완료'];
        if (stateCode < 0 || stateCode > 2) {
            throw new Error(
                '유효하지 않은 상태코드입니다. 올바른 상태코드를 입력해주세요.'
            )
        }

        const updateOrder = await this.orderModel.update(orderId, { state: state[stateCode] });

        return updateOrder;
    }

    // 주문 정보 삭제 - 주문 취소
    async deleteOrder(userRole, userId, orderId) {
        // id를 기준으로 DB에서 주문 내역 조회
        const order = await this.getOrderById(userRole, userId, orderId);

        const deleteOrder = await this.orderModel.delete(order);

        return deleteOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };