export const adminHeaderList = `
<li>
  <a class="color-whitesmoke link" href="/user-profile">회원정보</a>
  <span class="color-whitesmoke mx-3">/</span>
</li>

<li>
  <div class="dropdown">
  <span class="dropdown-trigger color-whitesmoke link">관리자 설정<i class="fa-solid fa-angle-down ml-2"></i></span>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div class="dropdown-content">
      <a href="/admin-product" class="dropdown-item">
        상품 관리
      </a>
      <a href="/admin-category" class="dropdown-item ">
        카테고리 관리
      </a>
      <a href="/admin-order" class="dropdown-item">
        주문 관리
      </a>
    </div>
  </div>
  <span class="color-whitesmoke mx-3">/</span>
  </div>
</li>

<li>
  <a class="logout color-whitesmoke link" href="#" role="button">로그아웃</a>
</li>`;
