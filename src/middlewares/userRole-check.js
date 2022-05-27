import { userModel } from '../db';

async function userRoleCheck(req, res, next) {
  try {
    //유저를 가져오고
    console.log(req.currentUserId);
    const currentUser = await userModel.findById(req.currentUserId);
    //db에서 그 유저의 role을 가져옴

    const userRole = currentUser.role;
    console.log(userRole);
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
