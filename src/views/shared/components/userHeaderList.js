export const userHeaderList = `
<li>
  <a class="color-whitesmoke link" href="/user-profile">회원정보</a>
  <span class="color-whitesmoke mx-3">/</span>
</li>
<li>
  <div class="dropdown">
  <span class="dropdown-trigger color-whitesmoke link">마이 페이지<i class="fa-solid fa-angle-down ml-2"></i></span>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div class="dropdown-content">
      <a href="/user-order" class="dropdown-item">
        주문 조회
      </a>
      <a href="/cart" class="dropdown-item ">
        장바구니
      </a>
    </div>
  </div>
  <span class="color-whitesmoke mx-3">/</span>
  </div>
</li>

<li>
  <a class="logout color-whitesmoke link" href="#">로그아웃</a>
</li>`;
