import { s3 } from '../config/s3'

class ImageService {
    // 이미지 삭제
    async imageDelete(imagePath) {
        const pathObject = imagePath.map(path => ({ Key: path.split('/').pop() }))

        s3.deleteObjects({
            Bucket: 'elice-sw2-shoppingmall',
            Delete: {
                Objects: pathObject,
                Quiet: false
            }
        }, function (error) {
            if (error) {
                next(error);
            }
        });
    }
}

const imageService = new ImageService();

export { imageService };