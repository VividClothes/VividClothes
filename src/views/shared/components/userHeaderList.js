export const userHeaderList = `
<li>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link  is-active">계정관리</a>
    <div class="navbar-dropdown ">
      <a class="navbar-item " href="#">
        주문조회
      </a>
      <a class="navbar-item is-active" href="/user-profile">
        회원정보
      </a>
    </div>
  </div>
</li>
<li>
  <a href="/cart" aria-current="page">
    <span class="icon">
      <i class="fas fa-cart-shopping"></i>
    </span>
    <span>카트</span>
  </a>
</li>
<li>
  <a class="logout" href="#logout" role="button">로그아웃</a>
</li>`;
