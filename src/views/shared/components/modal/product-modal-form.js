const productModalForm = (props) => {
  const { btnText } = props;

  return /* html */ `
    <form class="modal-form">
      <ul class="modal-ul">
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-name">
            상품 이름
          </label>
          <input class="modal-input" type="text" id="product-name" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-category">
            카테고리
          </label>
          <input class="modal-input" type="text" id="product-category" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-price">
            가격
          </label>
          <input class="modal-input" type="text" id="product-price" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-img">
            상품 이미지
          </label>
          <input class="modal-input" type="text" id="product-img" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-info">
            상품 정보
          </label>
          <input class="modal-input" type="text" id="product-info" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-size">
            사이즈
          </label>
          <input class="modal-input" type="text" id="product-size" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-color">
            색상
          </label>
          <input class="modal-input" type="text" id="product-color" />
        </li>                                
      </ul>
      <button class="modal-button" type="submit">
        ${btnText}
      </button>
    </form>
  `;
};

export default productModalForm;
