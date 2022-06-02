import { orderModel } from '../db';
import { productService } from './index';

const state = ['상품 준비중', '상품 배송중', '배송 완료'];

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    // 주문 추가
    async addOrder(orderInfo) {
        // 전체 상품 정보 가져온 후 알맞은 상품을 할당
        const allProduct = await productService.getProducts();
        orderInfo.products = orderInfo.products.map(product => {
            productService.increaseOrderCount(product.productId, 1);

            return {
                product: allProduct.datas.find(p => p._id == product.productId),
                option: product.option,
                quantity: product.quantity
            };
        });

        // 주문 총액 계산
        orderInfo.priceTotal = orderInfo.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        // 주문 상태 할당
        orderInfo.state = state[0];

        const createdNewOrder = await this.orderModel.create(orderInfo);

        return createdNewOrder;
    }

    // 모든 주문 조회
    async getOrders(page, perPage) {
        const orders = await this.orderModel.findAll(page, perPage);
        if (orders.datas.length < 1) {
            throw new Error(
                '주문 내역이 없습니다.'
            );
        }

        return orders;
    }

    // 유저별 주문 내역 조회
    async getOrderByUser(userId, page, perPage) {
        // 우선 해당 유저의 주문 내역이 db에 존재하는지 확인
        const orders = await this.orderModel.findByUser(userId, page, perPage);
        if (orders.datas.length < 1) {
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

    // 특정 주문의 특정 상품 조회
    async getOrderProduct(orderId, orderProductId) {
        // 해당 주문 내역이 존재하는지 확인
        const orderProduct = await this.orderModel.findByProduct(orderId, orderProductId);
        if (!orderProduct.products) {
            throw new Error(
                '해당 상품을 주문하지 않았습니다. 다시 확인해주세요.'
            );
        }

        return orderProduct;
    }

    // 주문 상태 변경
    async updateOrder(orderId, stateCode) {
        if (stateCode < 0 || stateCode >= state.length) {
            throw new Error(
                '유효하지 않은 상태코드입니다. 올바른 상태코드를 입력해주세요.'
            )
        }

        const updateOrder = await this.orderModel.update({ _id: orderId }, { state: state[stateCode] });

        return updateOrder;
    }

    // 리뷰 작성 여부 업데이트
    updateHasReview(orderId, orderProductId) {
        this.orderModel.update(
            {
                _id: orderId,
                "products._id": orderProductId
            },
            {
                $set: {
                    "products.$.hasReview": true
                }
            }
        );
    }

    // 주문 상품 부분 삭제 - 부분 취소
    async updateByProduct(userRole, userId, orderId, orderProductId) {
        // 해당 상품을 주문했는지 조회
        const order = await this.getOrderProduct(orderId, orderProductId);
        // basic-user가 다른 사람의 주문 내역에 접근할 수 없도록 제한
        if (userRole != 'admin-user' && userId != order.orderer) {
            throw new Error(
                '접근할 수 없는 사용자입니다. 다시 로그인해 주세요.'
            )
        }

        // 수정할 주문 데이터 객체 생성
        const updateProduct = {
            $pull: {
                products: {
                    _id: orderProductId
                }
            }
        };

        const updateOrder = await this.orderModel.update({ _id: orderId }, updateProduct);
        productService.increaseOrderCount(order.products[0].product, -1);

        // 주문한 전체 상품이 취소되었다면 주문 내역 삭제
        if (updateOrder.products.length < 1) {
            const deleteOrder = await this.deleteOrder(userRole, userId, order);
            return deleteOrder;
        }

        return updateOrder;
    }

    // 주문 정보 삭제 - 주문 취소
    async deleteOrder(userRole, userId, orderId) {
        // id를 기준으로 DB에서 주문 내역 조회
        const order = await this.getOrderById(userRole, userId, orderId);
        order.products.map(p => productService.increaseOrderCount(p.product, -1));

        const deleteOrder = await this.orderModel.delete(order);

        return deleteOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };