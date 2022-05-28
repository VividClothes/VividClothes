import headerNav from '/header/header-nav.js';
import headerStyle from '/header/header-style.js';

const header = () => {
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

    <div class="is-size-6 mr-6">${headerNav()}</div>
  </header>
  `;
};

export default header;
