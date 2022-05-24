import { Router } from 'express';
import is from '@sindresorhus/is';
import { categoryService } from '../services';

const categoryRouter = Router();

// 카테고리 추가
categoryRouter.post('/register', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req의 body 에서 데이터 가져옴
        const { categoryName } = req.body;

        // 위 데이터를 카테고리 db에 추가
        const newCategory = await categoryService.addCategory(categoryName);

        // 추가된 카테고리의 db 데이터를 프론트에 다시 보내줌
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

// 전체 카테고리 조회
categoryRouter.get('/list', async (req, res, next) => {

})

// 특정 카테고리 조회
categoryRouter.get('/:categoryName', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { categoryName } = req.params;

        // 카테고리명을 기준으로 DB 조회
        const category = await categoryService.getCategoryByName(categoryName);

        res.send(200).json(category);
    } catch (error) {
        next(error)
    }
})

// 카테고리명 수정
categoryRouter.post('/update/:categoryId', async (req, res, next) => {

})

// 카테고리 삭제
categoryRouter.delete('/delete/:categoryId', async (req, res, next) => {
    
})

export { categoryRouter };