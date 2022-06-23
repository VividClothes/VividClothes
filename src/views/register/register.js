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
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const data = { fullName, email, password };

    const result = await Api.post('/api/register', data);

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

    alert(`정상적으로 회원가입되었습니다.`);

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
