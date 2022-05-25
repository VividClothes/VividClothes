export const adminHeaderList = `
<li>
  <a class="navbar-item" href="/user-profile">회원정보</a>
</li>

<li>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link  is-active">관리자 설정</a>
    <div class="navbar-dropdown ">
      <a class="navbar-item " href="/admin-product">
        상품
      </a>
      <a class="navbar-item is-active" href="/admin-category">
        카테고리
      </a>
    </div>
  </div>
</li>

<li>
  <a class="logout" href="#logout" role="button">로그아웃</a>
</li>`;