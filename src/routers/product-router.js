import { Router } from 'express';
import is from '@sindresorhus/is';
import { productService, categoryService } from '../services';
import { imageUpload, imageDelete } from '../middlewares'

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

        // req.files에서 이미지 경로만 가져옴
        const imagePath = req.files.map(image => image.location);

        // req.body에서 데이터 가져와 변수에 할당
        const { productName, price, info, size, color } = req.body;

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
productRouter.get('/category/:categoryId', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { categoryId } = req.params;

        // categoryId를 기준으로 Products DB 조회
        const products = await productService.getProductByCategory(categoryId);

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

// 특정 상품 조회
productRouter.get('/:productId', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { productId } = req.params;

        // id를 기준으로 DB에서 상품 조회
        const product = await productService.getProductById(productId);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
})

// 상품 정보 수정 - 일단 이미지 제외하고 구현
productRouter.patch('/update/:productId', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req의 params와 body에서 데이터 가져옴
        const { productId } = req.params;
        const { productName, price, info, size, color } = req.body;

        // 입력된 카테고리를 카테고리 DB에서 검색 후 변수에 할당
        const findCategory = await categoryService.getCategoryByName(req.body.category);
        const category = findCategory;

        // 데이터를 상품 db에 반영하기
        const updateProduct = await productService.setProduct(productId, {
            productName,
            category,
            price,
            info,
            option: {
                size,
                color
            }
        });

        res.status(200).json(updateProduct);
    } catch (error) {
        next(error);
    }
})

// 상품 정보 삭제
productRouter.delete('/delete/:productId', imageDelete, async (req, res, next) => {
    try {
        const { productId } = req.params;

        const deleteProduct = await productService.deleteProduct(productId);

        res.status(200).json(deleteProduct);
    } catch (error) {
        next(error);
    }
})

export { productRouter };