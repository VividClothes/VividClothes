import { s3 } from '../config/s3'
import { productService } from '../services';

const imageDelete = async (req, res, next) => {
    // req의 params에서 데이터 가져옴
    const { productId } = req.params;

    // 기존 이미지의 경로 가져옴
    const product = await productService.getProductById(productId);
    const originalImages = product.imagePath.map(path => ({ Key: path.split('/').pop() }))

    s3.deleteObjects({
        Bucket: 'elice-sw2-shoppingmall',
        Delete: {
            Objects: originalImages,
            Quiet: false
        }
    }, function (error, data) {
        if (error) {
            next(error);
        }
        next()
    });
}

export { imageDelete };