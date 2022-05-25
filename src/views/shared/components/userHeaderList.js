export const userHeaderList = `
<li>
  <a class="navbar-item" href="/user-profile">회원정보</a>
</li>
<li>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link  is-active">마이페이지</a>
    <div class="navbar-dropdown ">
      <a class="navbar-item " href="/user-order">
        주문조회
      </a>
      <a class="navbar-item is-active" href="/cart">
        장바구니
      </a>
    </div>
  </div>
</li>

<li>
  <a class="logout" href="#logout" role="button">로그아웃</a>
</li>`;
