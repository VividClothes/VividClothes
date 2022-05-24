import { adminHeaderList } from '/adminHeaderList.js';
import { userHeaderList } from '/userHeaderList.js';

/* 
1. 로그인 안함
-> Nav bar에 로그인, 회원가입만 표시

2. 로그인 함
  1) localStorage 내 role 값이 admin이면 adminHeader
  2) localStorage 내 role 값이 admin이 아니면 userHeader
*/


const isLogin = localStorage.getItem('token') ? true : false;
const isAdmin = false; // 수정 필요

const notLoginHeaderList = `
<li><a href="/login">로그인</a></li>
<li><a href="/register">회원가입</a></li>
`;

let navBarList = '';

if(isLogin) {
  navBarList = isAdmin ? adminHeaderList : userHeaderList;
} else {
  navBarList = notLoginHeaderList;
}

/*
const firstList = isLogin
   ? `<li><a class="logout" href="#logout" role="button">로그아웃</a></li>`
   : `<li><a href="/login">로그인</a></li>`;

const secondList = isLogin
  ? `    
  <li>
    <a href="/cart" aria-current="page">
      <span class="icon">
        <i class="fas fa-cart-shopping"></i>
      </span>
      <span>카트</span>
    </a>
  </li>`
  : ``;
*/

export const header = document.createElement('header');
header.innerHTML = `    
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container mt-3">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/elice-rabbit.png" width="30" height="30" />
          <span class="has-text-link">쇼핑-n팀</span>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

        <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
          <ul id="navbar">
            ${navBarList}
          </ul>
        </div>
      </div>
    </div>
  </nav>
`;

const logoutButton = header.querySelector('.logout');

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  });
}
