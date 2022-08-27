import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { pagination } from '../../utils/pagination';

const Order = model('orders', OrderSchema);

const select = {
    _id: true,
    orderer: true,
    products: true,
    priceTotal: true,
    state: true,
    createdAt: true,
};
const sort = { createdAt: -1 };
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

const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN;

export class OrderModel {
    // 주문 추가
    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);

        return createdNewOrder;
    }

    // 모든 주문 조회
    async findAll(page, perPage) {
        const orders = await pagination(page, perPage, Order, {}, select, sort, populate);
        
        // imagePath에 cloudfront 도메인 연결
        orders.datas =  orders.datas.map(data => {
            data.products = data.products.map(p => {
                p.product.imagePath = p.product.imagePath.map(imgPath => {
                    if(imgPath.includes('http')){
                        return imgPath;
                    }
                    return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=80&h=80&f=webp`;
                })
                return p;
            })
            return data;
        })

        return orders;
    }

    // 유저별 주문 조회
    async findByUser(userId, page, perPage) {
        const filter = { orderer: userId };

        const orders = await pagination(page, perPage, Order, filter, select, sort, populate);
        
        orders.datas =  orders.datas.map(data => {
            data.products = data.products.map(p => {
                p.product.imagePath = p.product.imagePath.map(imgPath => {
                    if(imgPath.includes('http')){
                        return imgPath;
                    }
                    return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=80&h=80&f=webp`;
                })
                return p;
            })
            return data;
        })

        return orders;
    }

    // objectId를 이용해 특정 주문 조회
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId })
            .populate(populate);
        
        order.products = order.products.map(p => {
            p.product.imagePath = p.product.imagePath.map(imgPath => {
                if(imgPath.includes('http')){
                    return imgPath;
                }
                return `${CLOUDFRONT_DOMAIN}/${imgPath}?w=80&h=80&f=webp`;
            })
            return p;
        })

        return order;
    }

    // 특정 주문의 특정 상품 검색
    async findByProduct(orderId, orderProductId) {
        const order = await Order.findOne(
            { _id: orderId },
            {
                'orderer': true,
                'products': {
                    '$elemMatch': {
                        '_id': orderProductId
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