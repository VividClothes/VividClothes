import { s3 } from '../config/s3'
import multerS3 from 'multer-s3'
import multer from 'multer'

const imageUpload = multer({
    storage: multerS3({
        s3:  s3,
        bucket: 'elice-sw2-shoppingmall', 
        key: function(req, file, cb){
            // 확장자가 이미지 파일이 아닐 경우 에러
            const extension = file.mimetype.split('/')[1];
            if(!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension)){
                return cb(new Error('이미지 파일을 등록해 주세요.'))
            }

            cb(null, Date.now()+'.jpg')
        }
    }),
    acl: 'public-read-write'
});

export { imageUpload };