const productModalForm = (props) => {
  const { btnText, categories } = props;

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
          <label class="modal-label" htmlFor="product-info">
            상품 설명
          </label>
          <input class="modal-input" type="text" id="product-info" />
        </li>        
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-price">
            가격
          </label>
          <input class="modal-input" type="number" id="product-price" />
        </li>

        <li class="modal-li">
          <label class="modal-label" htmlFor="product-category">
            카테고리
          </label>
          <div class="select select-category-container">
            <select class="select-category">
              ${categories
                .map(({ categoryName }) => {
                  return /* html */ `
                  <option value=${categoryName}>${categoryName}</option>
                `;
                })
                .join('')}
            </select>
          </div>
        </li>  

        <li class="modal-li">
          <label class="modal-label" htmlFor="product-img">
            상품 이미지
          </label>
          <div class="file has-name is-right">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" multiple>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
              </span>
            </label>
          </div>
          <div class="imgs-container"></div>
        </li>
      
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-size">
            가능 사이즈
          </label>
          <div class="control size-radio">
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="Free">
              Free
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="S" >
              S
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="M" >
              M
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="L" >
              L
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="XL" >
              XL
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="2XL" >
              2XL
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="3XL" >
              3XL
            </label>                                    
          </div>
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-color">
            색상
          </label>
          <div class="color-container">
            <input class="modal-input" type="text" id="product-color" />
            <button class="color-button"><i class="fa-solid fa-circle-plus"></i></button>
          </div>
          <div class="colors-container"></div>
        </li>                                
      </ul>
      <button class="modal-button" type="submit">
        ${btnText}
      </button>
    </form>
  `;
};

export default productModalForm;
