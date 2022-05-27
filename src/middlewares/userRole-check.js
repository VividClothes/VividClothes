import jwt from 'jsonwebtoken';

async function userRoleCheck(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1];
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userRole = jwtDecoded.userRole;

    if (userRole == 'basic-user') {
      console.log('권한이 없는 페이지 입니다.');
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
