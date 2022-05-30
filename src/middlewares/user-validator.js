import { body } from 'express-validator';

// 유효성 검사 에러
const validate = (req, res, next) => {
  const errors = body(req);
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
