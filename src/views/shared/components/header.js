import * as Api from '/api.js';

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
const isAdmin = localStorage.getItem('role') === 'admin-user' ? true : false;

const notLoginHeaderList = `
  <li>
    <a class="color-whitesmoke link" href="/login">로그인</a>
    <span class="color-whitesmoke mx-3">/</span>
  </li>
  <li>
    <a class="color-whitesmoke link" href="/register">회원가입</a>
  </li>
`;

let navBarList = '';

if (isLogin) {
  navBarList = isAdmin ? adminHeaderList : userHeaderList;
} else {
  navBarList = notLoginHeaderList;
}

export const header = document.createElement('header');
header.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;700&family=Rancho&display=swap');
    
    .color-whitesmoke {
      color: whitesmoke;
    }

    .link {
      transition: color 0.3s ease;
      cursor: pointer;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none
    }

    .link:hover {
      color: gold;
    }

    .clicked {
      color: gold;
    }
    
    .header-container {
      background-color: #474747;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 35%);
    }

    .header-style {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 95px;
      font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    }

    .header-logo {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      font-family: 'Rancho', cursive;
    }

    .show {
      display: block;
    }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 270px;
    background-color: #363636;
    z-index: 999;
    visibility: hidden;
    transition: all 0.8s ease;
    transform: translateX(-100%);
    box-shadow: -3PX 0 4PX rgba(0, 0, 0, 25%);
  }  
  
  .close-button {
    position: absolute;
    top: 12PX;
    right: 15PX;
    border: 0PX;
    padding: 6PX;
    font-size: 32PX;
    color: whitesmoke;
    background: transparent;
    cursor: pointer;
  }

  .sidebar-links {
    position: relative;
    top: 70px;
    border-top: 1.5px solid rgba(0, 0, 0, 15%);
  }

  .sidebar-links ul {
    margin: 0px;
    padding-top: 13px;
    padding-left: 16px;
  }

  .sidebar-links li {
    margin-bottom: 10px;
    font-size: 24px;
  }

  .sidebar-links li a {
    display: inline-flex;
    align-items: center;
    padding: 5px;
  }

  .link-text {
    padding-left: 7.5px;
    font-size: 20px;
  }

  .open {
    visibility: visible;
    transform: translateX(0);
  }


  </style>    
  <nav class="header-style header-container" role="navigation" aria-label="main navigation">
    <div class="hamburger-menu is-size-5 ml-6 color-whitesmoke link">
      <i class="fa-solid fa-bars"></i><span class=""> Category</span>
    </div>

    <aside class="sidebar">
      <button class="close-button link">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="sidebar-links">
        <ul class="root-category">
        </ul>
      </div>
    </aside>

    <h1 class="header-logo header-style is-size-2">
      <a class="color-whitesmoke link" href="/">
        <span class="">Vivid Clothes</span>
      </a>
    </h1>

    <div class="is-size-6 mr-6">
      <ul class="header-style">
          ${navBarList}
      </ul>
    </div>
  </nav>
`;

const logoutButton = header.querySelector('.logout');
const dropdown = header.querySelector('.dropdown-trigger');
const hamburgerMenu = header.querySelector('.hamburger-menu');
const sidebar = header.querySelector('.sidebar');
const closeButton = header.querySelector('.close-button');

createCategoryLists();

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  });
}

if (dropdown) {
  dropdown.addEventListener('click', () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');
    dropdown.classList.toggle('clicked');
  });
}

hamburgerMenu.addEventListener('click', () => {
  sidebar.classList.add('open');
});

if (closeButton) {
  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

async function createCategoryLists() {
  const categories = await Api.get('/category/list');

  const categoryContainer = header.querySelector('.root-category');
  const categoryLists = categories
    .map(
      (category) => `
        <li>
          <a class="link color-whitesmoke" href=/products/?category=${category.categoryName}>
            <span class="link-text">${category.categoryName}</span>
          </a>
        </li>`
    )
    .join('');

  categoryContainer.innerHTML = `${categoryLists}`;
}
