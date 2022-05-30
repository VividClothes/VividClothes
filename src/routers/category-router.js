import { Router } from 'express';
import { checkBody, loginRequired, userRoleCheck } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// 카테고리 추가
categoryRouter.post('/register',
    loginRequired,
    userRoleCheck,
    checkBody,
    async (req, res, next) => {
        try {
            // req의 body 에서 데이터 가져옴
            const { categoryName } = req.body;

            // 위 데이터를 카테고리 db에 추가
            const newCategory = await categoryService.addCategory(categoryName);

            // 추가된 카테고리의 db 데이터를 프론트에 다시 보내줌
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

// 전체 카테고리 조회
categoryRouter.get('/list', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

// 카테고리명 수정
categoryRouter.put('/update/:categoryId',
    loginRequired,
    userRoleCheck,
    checkBody,
    async (req, res, next) => {
        try {
            // req의 params과 body에서 데이터 가져옴
            const { categoryId } = req.params;
            const { categoryName } = req.body;

            // 위 데이터로 카테고리 정보 수정
            const category = await categoryService.setCategory(categoryId, {
                categoryName,
            });

            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }
);

// 카테고리 삭제
categoryRouter.delete('/delete/:categoryId',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            // req의 params에서 데이터 가져옴
            const { categoryId } = req.params;

            // 카테고리 정보 삭제
            const category = await categoryService.deleteCategory(categoryId);

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

export { categoryRouter };