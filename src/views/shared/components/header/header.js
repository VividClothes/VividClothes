import { headerNav, addHeaderNavEventListener } from '/header/header-nav.js';
import headerStyle from '/header/header-style.js';

const createHeader = () => {
  return /* html */ `
  ${headerStyle}
  <header class="flex-style">
    <div class="header-left-container">
      <div class="hamburger-menu is-size-5 link">
        <i class="fa-solid fa-bars"></i><span> Category</span>
      </div>
      <div class="wrapper">
        <div class="searchBar">
          <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="제품 검색" value="" />
          <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="mobile-hamburger-menu is-size-5 link">
      <i class="fa-solid fa-bars"></i>
    </div>

    <h1 class="header-logo flex-style">
      <a class="link" href="/">
        <span class="">Vivid Clothes</span>
      </a>
    </h1>

    <div id="header-nav-root" class=""></div>
  </header>
  `;
};

const header = document.createElement('div');
header.insertAdjacentHTML('afterbegin', createHeader()); // 헤더 생성. 여기 이후에 이벤트 등록해야함.
header.querySelector('#header-nav-root').insertAdjacentElement('afterbegin', headerNav);

const searchProductButton = header.querySelector('#searchQuerySubmit');
const searchQuerySubmit = header.querySelector('#searchQueryInput');

function addHeaderEventListener() {
  hamburgerEventListnener();

  addHeaderNavEventListener();
}

function hamburgerEventListnener() {
  const hamburgerMenu = header.querySelector('.hamburger-menu');
  const mobileHamburgerMenu = header.querySelector('.mobile-hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  const hamburgerHandler = () => {
    sidebar.classList.add('open');
  };
  hamburgerMenu.addEventListener('click', hamburgerHandler);
  mobileHamburgerMenu.addEventListener('click', hamburgerHandler);
}

searchProductButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = header.querySelector('#searchQueryInput').value;
  if (!searchInput) {
    alert('제품명을 입력해주세요.');
  } else {
    window.location.href = `/products?searchInput=${searchInput}&page=1`;
  }
});

searchQuerySubmit.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (window.event.keyCode == 13) {
    const searchInput = header.querySelector('#searchQueryInput').value;
    if (!searchInput) {
      alert('제품명을 입력해주세요.');
    } else {
      window.location.href = `/products?searchInput=${searchInput}&page=1`;
    }
  }
});

export { header, addHeaderEventListener };
