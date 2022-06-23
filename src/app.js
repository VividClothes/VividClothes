import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  imageRouter,
  productRouter,
  categoryRouter,
  orderRouter,
  reviewRouter,
} from './routers';
import { errorHandler } from './middlewares';
import passport from 'passport';

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

require('./passport')();
app.use(passport.initialize());

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api', userRouter);
app.use('/image', imageRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);

app.use(errorHandler);

export { app };
