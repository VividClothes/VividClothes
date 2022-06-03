const headerNavUser = () => {
  return /* html */ `
    <a href="/user-order-list" class="dropdown-item">
      주문 조회
    </a>
    <a href="/user-review-list?page=1" class="dropdown-item ">
      마이 리뷰
    </a>
    <a href="/cart" class="dropdown-item ">
      장바구니
    </a>
`;
};

export default headerNavUser;
