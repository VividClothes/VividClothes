import { headerNav, addHeaderNavEventListener } from '/header/header-nav.js';
import headerStyle from '/header/header-style.js';

const createHeader = () => {
  return /* html */ `
  ${headerStyle}
  <header class="flex-style">
    <div class="hamburger-menu is-size-5 ml-6 link">
      <i class="fa-solid fa-bars"></i><span> Category</span>
    </div>

    <h1 class="header-logo flex-style is-size-2">
      <a class="link" href="/">
        <span class="">Vivid Clothes</span>
      </a>
    </h1>

    <div id="header-nav-root" class="is-size-6 mr-6"></div>
  </header>
  `;
};

const header = document.createElement('div');
header.insertAdjacentHTML('afterbegin', createHeader());
header.querySelector('#header-nav-root').insertAdjacentElement('afterbegin', headerNav);

function addHeaderEventListener() {
  hamburgerEventListnener();

  addHeaderNavEventListener();
}

function hamburgerEventListnener() {
  const hamburgerMenu = header.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  const hamburgerHandler = () => {
    sidebar.classList.add('open');
  };
  hamburgerMenu.addEventListener('click', hamburgerHandler);
}

export { header, addHeaderEventListener };
