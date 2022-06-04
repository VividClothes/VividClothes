const headerNavAdmin = () => {
  return /* html */ `
  <a href="/admin-product?page=1" class="dropdown-item">
    상품 관리
  </a>
  <a href="/admin-category" class="dropdown-item ">
    카테고리 관리
  </a>
  <a href="/admin-order?page=1" class="dropdown-item">
    주문 관리
  </a>
`;
};

export default headerNavAdmin;
