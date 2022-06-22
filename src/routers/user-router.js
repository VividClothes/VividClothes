import { Router } from 'express';
import { userService } from '../services';
import { checkBody, loginRequired, userRoleCheck, validateSignup, validateCredential } from '../middlewares';
// import generateRandomPassword from '../utils/generate-random-password';

const userRouter = Router();

// 회원가입 api
userRouter.post(
    '/register',
    checkBody,
    validateSignup, // 이메일 유효성 검사 미들웨어
    async (req, res, next) => {
        try {
            // req (request)의 body 에서 데이터 가져오기
            const { fullName, email, password } = req.body;

            // 위 데이터를 유저 db에 추가하기 - 회원가입 완료 시 자동 로그인(jwt 토큰 반환)
            const loginData = await userService.addUser({
                fullName,
                email,
                password,
            });

            res.status(201).json(loginData);
        } catch (error) {
            next(error);
        }
    }
);

// 로그인 api
userRouter.post(
    '/login',
    checkBody,
    validateCredential, // 이메일 유효성 검사 미들웨어
    async (req, res, next) => {
        try {
            // req (request) 에서 데이터 가져오기
            const { email, password } = req.body;

            // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
            const loginData = await userService.getUserToken({
                email,
                password,
            });

            // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
            res.status(200).json(loginData);
        } catch (error) {
            next(error);
        }
    }
);

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
// userRoleCheck 미들웨어로 admin이 아니면 접근할 수 없도록 제한
userRouter.get(
    '/userlist',
    loginRequired,
    userRoleCheck,
    async (req, res, next) => {
        try {
            // 전체 사용자 목록을 얻음
            const users = await userService.getUsers();

            // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

// 특정 유저 찾기
userRouter.get('/user',
    loginRequired,
    async (req, res, next) => {
        try {
            // req에서 현재 로그인한 사용자의 Id 가져옴
            const userId = req.currentUserId;

            const user = await userService.getUser({ _id: userId });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

// 사용자 정보 수정 - admin은 개별 사용자의 role 변경 가능하도록 수정
userRouter.patch(
    '/users',
    checkBody,
    loginRequired,
    async (req, res, next) => {
        try {
            // req에서 현재 로그인한 사용자의 Id 가져옴
            const userId = req.currentUserId;

            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const { fullName, address, phoneNumber, currentPassword } = req.body;
            // 확인을 위한 currentPassword가 없을 시, 진행 불가
            if (!currentPassword) {
                throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
            }

            const userInfoRequired = { userId, currentPassword };

            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = {
                ...(fullName && { fullName }),
                ...(address && { address }),
                ...(phoneNumber && { phoneNumber }),
            };

            // 사용자 정보를 업데이트함.
            const updatedUserInfo = await userService.setUser(
                userInfoRequired,
                toUpdate
            );

            // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
            res.status(200).json(updatedUserInfo);
        } catch (error) {
            next(error);
        }
    }
);

// 사용자 정보 삭제 - 일반 회원의 탈퇴, admin 유저의 회원 정보 삭제?
userRouter.delete('/user',
    loginRequired,
    async (req, res, next) => {
        try {
            const currentPassword = req.body.currentPassword;
            if (!currentPassword) {
                throw new Error('탈퇴하려면, 현재의 비밀번호가 필요합니다.');
            }

            const userId = req.currentUserId;
            const userInfoRequired = { userId, currentPassword };

            await userService.deleteUser(userInfoRequired);

            res.status(204).json({ message: '탈퇴가 완료되었습니다.' });
        } catch (error) {
            next(error);
        }
    }
);

// 비밀번호 찾기 - 구현 필요
userRouter.post(
    '/reset-password',
    checkBody,
    async (req, res) => {
        const { email } = req.body;

        // 유저 정보 검색
        const userInfo = await userService.getUser({ email });

        // 랜덤 비밀번호 생성
        const passwordToken = generateRandomPassword();
        const data = {
            passwordToken,
            email: userInfo.email,
            ttl: 300, //ttl 값 설정 (5분)
        };
        // 5. 인증 코드 테이블에 데이터 입력
        // 예) db.EmailAuth.create(data);
        userService.createAuth(data);
    }
);

export { userRouter };