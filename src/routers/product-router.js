import { Router } from 'express';
import is from '@sindresorhus/is';
import { productService, categoryService } from '../services';
import { imageUpload } from '../middlewares'

const productRouter = Router();

// 상품 등록 api
// s3에 이미지 파일 등록하는 미들웨어 추가
productRouter.post('/register', imageUpload.array('image'), async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // 입력된 카테고리를 카테고리 DB에서 검색 후 변수에 할당
        const findCategory = await categoryService.getCategoryByName(req.body.category);
        const category = findCategory;

        // req에서 데이터 가져와 변수에 할당
        const productName = req.body.productName;
        const price = req.body.price;
        const imagePath = req.files.map(image => image.location);
        const info = req.body.info;
        const size = req.body.size;
        const color = req.body.color;

        // 위 데이터를 상품 db에 추가하기
        const newProduct = await productService.addProduct({
            productName,
            category,
            price,
            imagePath,
            info,
            option: {
                size,
                color
            }
        });

        // 추가된 상품의 db 데이터를 프론트에 다시 보내줌
        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// 전체 상품 목록 가져옴
productRouter.get('/list', async (req, res, next) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

// 카테고리별 상품 조회
productRouter.get('/:categoryName', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { categoryName } = req.params;

        // 카테고리명을 기준으로 Categories DB 조회
        const findCategory = await categoryService.getCategoryByName(categoryName);
        // 조회된 데이터(categoryModel)를 기준으로 Products DB 조회
        const products = await productService.getProductByCategory(findCategory);

        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
})

// 특정 상품 조회
productRouter.get('/:productId', async (req, res, next) => {

})

// 상품 정보 수정
productRouter.post('/update/:productId', async (req, res, next) => {

})

// 상품 정보 삭제
productRouter.delete('/delete/:productId', async (req, res, next) => {
    
})

export { productRouter };