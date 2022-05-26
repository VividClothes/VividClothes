import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { orderService, userService, productService } from '../services';

const orderRouter = Router();

// 주문 등록
// loginRequired 미들웨어 사용해 로그인한 유저만 주문 가능
orderRouter.post('/register', /*loginRequired,*/ async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // 유저와 상품 검색 후 변수에 할당
        const orderer = await userService.getUserById(req.body.orderer);
        const products = [{
            product: await productService.getProductById(req.body.products[0].productId),
            quantity: req.body.products[0].quantity
        }]
        // const products = req.body.products.map( async product => ({
        //     product: await productService.getProductById(product.productId),
        //     quantity: product.quantity
        // }));

        // 주문 총액 계산
        const priceTotal =  products.reduce( (sum, item) => sum + item.product.price*item.quantity, 0);

        // req.body에서 데이터 가져와 변수에 할당
        const { recipient, postalCode, address1, address2, phoneNumber } = req.body;

        // 위 데이터를 주문 db에 추가하기
        const newOrder = await orderService.addOrder({
            orderer,
            products,
            priceTotal,
            recipient,
            address: {
                postalCode,
                address1,
                address2
            },
            phoneNumber
        });

        // 추가된 주문 데이터를 프론트에 다시 보내줌
        res.status(200).json(newOrder);
    } catch (error) {
        next(error);
    }
});

// 전체 주문 목록 조회 - 관리자 권한
orderRouter.get('/list', /*loginRequired,*/ async (req, res, next) => {
    try {
        // // admin-user가 아닌 경우 접근 제한
        // if(req.userRole != 'admin-user'){
        //     throw new Error(
        //         '관리자 권한을 가진 유저만 접근 가능합니다.'
        //     );
        // }
        
        const orders = await orderService.getOrders();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
})

// 유저별 주문 목록 조회
orderRouter.get('/list/:userId', /*loginRequired,*/ async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { userId } = req.params;

        // // basic-user가 다른 사람의 주문 목록을 확인할 수 없도록 제한
        // if(req.userRole != 'admin-user' && req.currentUserId != userId){
        //     throw new Error(
        //         '해당 유저의 주문 목록을 확인할 수 없습니다.'
        //     );
        // }

        const orders = await orderService.getOrderByUser(userId);

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
})

// 특정 주문 내역 조회
orderRouter.get('/:orderId', /*loginRequired,*/ async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { orderId } = req.params;

        // id를 기준으로 DB에서 주문 내역 조회
        const order = await orderService.getOrderById(orderId);

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
})

// 주문 정보 삭제 - 주문 취소
orderRouter.delete('/cancel/:orderId', /*loginRequired,*/ async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { orderId } = req.params;

        const deleteOrder = await orderService.deleteOrder(orderId);

        res.status(200).json(deleteOrder);
    } catch (error) {
        next(error);
    }
})

export { orderRouter };