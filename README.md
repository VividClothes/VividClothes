# 쇼핑몰 웹 서비스 프로젝트

제품들을 조회하고, 장바구니에 추가하고, 또 주문을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트입니다. <br />
**웹 구현 예시** (링크는 프로젝트 기간에만 유효합니다)

### http://shopping-demo.elicecoding.com/

<br>

** 핵심 기능은 하기입니다. (이외에도 더 있으며, 추가 안내 될 프로젝트 평가기준표에서 구체화될 예정입니다.) <br>
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.

## 주요 사용 기술

### 1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome 
- Daum 도로명 주소 api 
- 이외

### 2. 백엔드 

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- 이외

## 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**



## 설치 방법

1. **.env 파일 설정 (MONGODB_URL 환경변수를, 개인 로컬 혹은 Atlas 서버 URL로 설정해야 함)**

2. express 실행

```bash
# npm 을 쓰는 경우 
npm install
npm run start

# yarn 을 쓰는 경우
yarn
yarn start
```

<br>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.


### 이미지
![홈 인기 상품](https://user-images.githubusercontent.com/73643088/176643220-cbad8b28-0b66-4ef0-ace0-c56f5fa79df8.gif)
![홈 신상품 무한 스크롤](https://user-images.githubusercontent.com/73643088/176643247-5d17789e-d47d-4f87-805a-9c166eb486f5.gif)
<p align="center">
  <img src="https://user-images.githubusercontent.com/73643088/176641462-bd61a147-7f05-4f34-9255-de695d66cae5.gif" width="33%" height="33%" alt="로컬 로그인">
  <img src="https://user-images.githubusercontent.com/73643088/176641464-9f1fbaf9-5fda-43ec-a9f8-af22426dc9a1.gif" width="33%" height="33%" alt="카카오 로그인">
  <img src="https://user-images.githubusercontent.com/73643088/176641452-959f8ac8-adb0-4e33-a641-7b0900379b54.gif" width="33%" height="33%" alt="구글 로그인">
</p>

![상품 선택](https://user-images.githubusercontent.com/73643088/176643292-3f424dee-37c6-436e-961f-2e8834abdcfd.gif)
![장바구니 주문](https://user-images.githubusercontent.com/73643088/176643303-64d9c197-1f06-42f2-bcb8-75b7d9028af2.gif)
![리뷰 작성](https://user-images.githubusercontent.com/73643088/176643309-44db1cfa-be8c-4b29-bf23-54d2a0e84d25.gif)
![검색](https://user-images.githubusercontent.com/73643088/176643313-bbaa72d6-ed54-4f6c-8b57-bc93129610de.gif)
<p align="center">
  <img src="https://user-images.githubusercontent.com/73643088/176643317-379e816c-4cf9-4ed2-a064-7670c0712255.gif" width="33%" height="33%" alt="홈 반응형">
  <img src="https://user-images.githubusercontent.com/73643088/176643323-4d58bbb6-8ad3-400c-866c-63fe42aa9fdc.gif" width="33%" height="33%" alt="상품 상세 반응형">
  <img src="https://user-images.githubusercontent.com/73643088/176643325-b32fb12d-1f45-4231-8fed-5930f72b3da2.gif" width="33%" height="33%" alt="주문 내역 반응형">
</p>
