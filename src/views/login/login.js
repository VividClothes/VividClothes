import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';

/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async () => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML(
    'afterbegin',
    await createCategory({ categories })
  );
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/

// 요소(element), input 혹은 상수
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const localSubmitButton = document.querySelector('#localSubmitButton');
const kakaoSubmitButton = document.querySelector('#kakaoSubmitButton');
const googleSubmitButton = document.querySelector('#googleSubmitButton');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  localSubmitButton.addEventListener('click', handleLocalSubmit);
  googleSubmitButton.addEventListener('click', handleGoogleSubmit);
  kakaoSubmitButton.addEventListener('click', handleKakaoSubmit);
}

function insertHeader() {
  document.body.insertAdjacentElement('afterbegin', header);
}

// 로컬 로그인 진행
async function handleLocalSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.'
    );
  }

  // 로그인 api 요청
  try {
    const data = { email, password };

    const result = await Api.post('/api/login', data);

    const token = result.token;
    const role = result.userRole;
    const hashedEmail = result.hashedEmail;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('hashedEmail', hashedEmail);

    // indexedDB 생성
    const onRequest = indexedDB.open(hashedEmail, 1);

    onRequest.onsuccess = () => {
      //alert('indexedDB onsuccess');
    };

    onRequest.onupgradeneeded = (e) => {
      //alert('indexedDB onupgradeneeded');
      const db = onRequest.result;
      db.createObjectStore('order', { keyPath: 'shortId' });
      db.createObjectStore('cart', { keyPath: 'shortId' });
    };

    onRequest.onerror = () => {
      //alert('Error creating or accessing db')
    };

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 카카오 로그인 진행
async function handleKakaoSubmit(e) {
  e.preventDefault();

  // 로그인 api 요청
  try {
    const result = await Api.get('/api/login/kakao');

    const token = result.token;
    const role = result.userRole;
    const hashedEmail = result.hashedEmail;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('hashedEmail', hashedEmail);

    // indexedDB 생성
    const onRequest = indexedDB.open(hashedEmail, 1);

    onRequest.onsuccess = () => {
      //alert('indexedDB onsuccess');
    };

    onRequest.onupgradeneeded = (e) => {
      //alert('indexedDB onupgradeneeded');
      const db = onRequest.result;
      db.createObjectStore('order', { keyPath: 'shortId' });
      db.createObjectStore('cart', { keyPath: 'shortId' });
    };

    onRequest.onerror = () => {
      //alert('Error creating or accessing db')
    };

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 구글 로그인 진행
// async function handleGoogleSubmit(e) {
//   e.preventDefault();

//   // 로그인 api 요청
//   try {

//     const result = await Api.get('/api/login/google');

//     const token = result.token;
//     const role = result.userRole;
//     const hashedEmail = result.hashedEmail;

//     // 로그인 성공, 토큰을 세션 스토리지에 저장
//     // 물론 다른 스토리지여도 됨
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     localStorage.setItem('hashedEmail', hashedEmail);

//     // indexedDB 생성
//     const onRequest = indexedDB.open(hashedEmail, 1);

//     onRequest.onsuccess = () => {
//       //alert('indexedDB onsuccess');
//     }

//     onRequest.onupgradeneeded = (e) => {
//       //alert('indexedDB onupgradeneeded');
//       const db = onRequest.result;
//       db.createObjectStore('order', { keyPath: 'shortId'});
//       db.createObjectStore('cart', { keyPath: 'shortId'});
//     }

//     onRequest.onerror = () => {
//       //alert('Error creating or accessing db')
//     }

//     alert(`정상적으로 로그인되었습니다.`);

//     // 로그인 성공

//     // 기본 페이지로 이동
//     window.location.href = '/';
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
// }
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/login/google');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + id_token);
}
