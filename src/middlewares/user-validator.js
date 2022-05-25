import { body } from 'express-validator';

// 유효성 검사 에러
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// login 유효성 검사
export const validateCredential = [
  body('email') //
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .withMessage('invalid email'),
  //   body('password') //
  //     .trim()
  //     .isLength({ min: 5 })
  //     .withMessage('비밀번호는 5글자 이상이어야 합니다.'),
  validate,
];
// signup 유효성 검사
export const validateSignup = [
  ...validateCredential,
  body('email')
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .withMessage('invalid email'),
  validate,
];
