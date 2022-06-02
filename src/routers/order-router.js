import { Router } from 'express';
import { checkBody, loginRequired, userRoleCheck } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

// 주문 등록
// loginRequired 미들웨어 사용해 로그인한 유저만 주문 가능
orderRouter.post('/register',
    loginRequired,
    checkBody,
    async (req, res, next) => {
        try {
            // req에서 데이터 가져와 변수에 할당
            const orderer = req.currentUserId;
            const { products, recipient, postalCode, address1, address2, phoneNumber } = req.body;

            // 위 데이터를 주문 db에 추가하기
            const newOrder = await orderService.addOrder({
                orderer,
                products,
                priceTotal: 0,
                recipient,
                address: {
                    postalCode,
                    address1,
                    address2
                },
                phoneNumber
            });

            // 추가된 주문 데이터를 프론트에 다시 보내줌
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);

// 전체 주문 목록 조회 - 관리자 권한
orderRouter.get('/list',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 10);

            const orders = await orderService.getOrders(page, perPage);

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
);

// 유저별 주문 목록 조회 - 관리자용
orderRouter.get('/list/:userId',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 10);

            const orders = await orderService.getOrderByUser(userId, page, perPage);

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
);

// 유저별 주문 목록 조회 - 일반 유저용
orderRouter.get('/mylist',
    loginRequired,
    async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 10);

            const orders = await orderService.getOrderByUser(userId, page, perPage);

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
);

// 특정 주문 내역 조회
orderRouter.get('/:orderId',
    loginRequired,
    async (req, res, next) => {
        try {
            // req의 params에서 데이터 가져옴
            const { orderId } = req.params;

            // id를 기준으로 DB에서 주문 내역 조회
            const order = await orderService.getOrderById(
                req.currentUserRole,
                req.currentUserId,
                orderId
            );

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

// 주문 상태 변경
orderRouter.patch('/update/:orderId',
    loginRequired,
    userRoleCheck,
    checkBody,
    async (req, res, next) => {
        try {
            // req에서 데이터 가져옴
            const { orderId } = req.params;
            const stateCode = Number(req.body.stateCode);

            const updateOrder = await orderService.updateOrder(orderId, stateCode);

            res.status(201).json(updateOrder);
        } catch (error) {
            next(error);
        }
    }
);

// 일부 상품 삭제 - 부분 취소
orderRouter.patch('/:orderId/product/:orderProductId/cancel',
    loginRequired,
    async (req, res, next) => {
        try {
            // req의 params에서 데이터 가져옴
            const { orderId, orderProductId } = req.params;

            const updateProduct = await orderService.updateByProduct(
                req.currentUserRole,
                req.currentUserId,
                orderId,
                orderProductId
            );

            res.status(201).json(updateProduct);
        } catch (error) {
            next(error);
        }
    }
);

// 주문 정보 삭제 - 주문 취소
orderRouter.delete('/cancel/:orderId',
    loginRequired,
    async (req, res, next) => {
        try {
            // req의 params에서 데이터 가져옴
            const { orderId } = req.params;

            const deleteOrder = await orderService.deleteOrder(
                req.currentUserRole,
                req.currentUserId,
                orderId
            );

            res.status(200).json(deleteOrder);
        } catch (error) {
            next(error);
        }
    }
);

export { orderRouter };