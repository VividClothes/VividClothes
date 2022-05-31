import * as Api from '/api.js';

import productGridStyle from '/products/products-grid-style.js';

const productGrid = async (props) => {
  let selectedProducts = await Api.get('/product/list');

  if (props) {
    if (props.selected !== 'default') {
      selectedProducts = selectedProducts.filter(({ category }) => {
        if (!category) return false;
        return category.categoryName === props.selected;
      });
    }
  }

  return /* html */ `
    ${productGridStyle}
    <ul class="grid">
    ${selectedProducts
      .map((product) => {
        const { _id, productName, category, price, imagePath, info, option } = product;

        return /* html */ `
        <li class="col">
          <a class="a-link" href=/product?id=${_id}>
            <div class="card">
              <div class="card-image">
                <div class="img-container">
                  <img class="grid-img" src=${imagePath[0]} alt=${productName} />
                </div>
              </div>
            </a>
  
              <div>
                <div class="grid-media">
                  <div class="media-content">
                    <a class="a-link" href=/product?id=${_id}><p class="title font-16">${productName}</p></a>
                  </div>
                </div>
  
                <div class="grid-contents">
                  <p class="font-15">${info}</p>
                  <div class="button-container">
                    <button data-id="${_id}" class="edit-product-btn buttonss has-background-info-dark">수정</button>
                    <button data-id="${_id}" class="delete-product-btn buttonss has-background-danger">삭제</button>
                  </div>
                  <p class="subtitle"><i class="fa-solid fa-won-sign"></i> ${price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </li>
      `;
      })
      .join('')}
    </ul>
  `;
};

export default productGrid;
