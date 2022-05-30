import headerNavAdmin from './header-nav-admin.js';
import headerNavUser from './header-nav-user.js';

const headerNav = (props) => {
  const isLogin = localStorage.getItem('token') ? true : false;
  const isAdmin = localStorage.getItem('role') === 'admin-user' ? true : false;

  const config = isAdmin ? '관리자 설정' : '마이 페이지';
  const dropdownContent = isAdmin ? headerNavAdmin : headerNavUser;

  return /* html */ `
    <ul class="flex-style">
      <li>
        <a class="link" href="/user-profile">회원정보</a>
        <span class="mx-3">/</span>
      </li>

      ${
        isLogin &&
        /* html */ `
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
            <span class="mx-3">/</span>
            </div>
          </li>
          `
      }

      <li>
        <a class="logout link" href="#" role="button">로그아웃</a>
      </li>
    </ul>
  `;
};

export default headerNav;
