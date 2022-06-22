import jwt from 'jsonwebtoken';

async function userRoleCheck(req, res, next) {
    try {
        const userRole = req.currentUserRole;

        if (userRole == 'basic-user') {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '권한이 없는 페이지 입니다.',
            });
            return;
        }

        next();
    } catch (error) {
        next(error);
    }
}

export { userRoleCheck };