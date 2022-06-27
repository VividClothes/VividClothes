import headerNavAdmin from './header-nav-admin.js';
import headerNavUser from './header-nav-user.js';

const notLoginHeaderNav = () => /* html */ `
<ul class="flex-style desktop">
  <li>
    <a class="link" href="/login">로그인</a>
    <span class="span-dash">/</span>
  </li>
  <li>
    <a class="link" href="/register">회원가입</a>
  </li>
</ul>

<ul class="flex-style mobile-nav">
  <li>
    <a class="link" href="/login"><i class="fa-solid fa-arrow-right-to-bracket"></i></a>
  </li>
  <li>
    <a class="link" href="/register"><i class="fa-solid fa-user-plus"></i></a>
  </li>
</ul>
`;

const loginHeaderNav = (config, dropdownContent) => /* html */ `
  <ul class="flex-style desktop">
    <li>
      <a class="link" href="/profile">회원정보</a>
      <span class="span-dash">/</span>
    </li>
    
    <li id="nav-mid">
      <div class="dropdown">
      <span class="dropdown-trigger link" role="button">
        ${config}
        <i class="fa-solid fa-angle-down ml-2"></i>
      </span>
      <div class="dropdown-menu" id="dropdown-menu3" role="menu">
        <div class="dropdown-content">
          ${dropdownContent()}
        </div class="dropdown-content">
      </div>
      <span class="span-dash">/</span>
      </div>
    </li>
  
    <li>
      <a class="logout link" href="#" role="button">로그아웃</a>
    </li>
  </ul>

  <ul class="flex-style mobile-nav">
    <li>
      <a class="link" href="/profile"><i class="fa-solid fa-circle-info"></i></a>
    </li>

    <li id="nav-mid">
      <div class="dropdown">
      <span class="dropdown-trigger link" role="button">
        ${
          config === '관리자 설정'
            ? '<i class="fa-solid fa-gear"></i>'
            : '<i class="fa-solid fa-user"></i>'
        }
      </span>
      <div class="dropdown-menu" id="dropdown-menu3" role="menu">
        <div class="dropdown-content">
          ${dropdownContent()}
        </div class="dropdown-content">
      </div>
      </div>
    </li>

    <li>
      <a class="logout link" href="#" role="button"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
    </li>
  </ul>
`;

const createHeaderNav = (props) => {
  const isLogin = localStorage.getItem('token') ? true : false;
  const isAdmin = localStorage.getItem('role') === 'admin-user';

  const config = isAdmin ? '관리자 설정' : '마이 페이지';
  const dropdownContent = isAdmin ? headerNavAdmin : headerNavUser;

  return !isLogin ? notLoginHeaderNav() : loginHeaderNav(config, dropdownContent);
};

const headerNav = document.createElement('div');
headerNav.insertAdjacentHTML('afterbegin', createHeaderNav());

function addHeaderNavEventListener() {
  dropdownEventListener();
  logoutEventListener();
}

function dropdownEventListener() {
  const dropdownTriggers = headerNav.querySelectorAll('.dropdown-trigger');
  const dropdownMenus = headerNav.querySelectorAll('.dropdown-menu');

  if (!dropdownTriggers) return;

  dropdownTriggers.forEach((el, i) => {
    el.addEventListener('click', () => {
      el.classList.toggle('clicked');
      dropdownMenus[i].classList.toggle('show');
    });
  });
}

function logoutEventListener() {
  const logoutBtn = headerNav.querySelectorAll('.logout');

  if (!logoutBtn) return;

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('hashedEmail');
    deleteCookie('token');
    deleteCookie('userRole');
    deleteCookie('hashedEmail');

    window.location.href = '/';
  };

  logoutBtn.forEach((el) => {
    el.addEventListener('click', (e) => logoutHandler(e));
  });
}

//쿠기 값 삭제
const deleteCookie = (key) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export { headerNav, addHeaderNavEventListener, createHeaderNav };
