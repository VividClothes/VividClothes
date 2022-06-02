import * as Api from '/api.js';

import productGridStyle from '/products/products-grid-style.js';

const productGrid = async (props = {}) => {
  let products;

  if (!props.categoryId || props.categoryId === 'default') {
    products = await Api.get('/product/list');
  } else {
    products = await Api.get(`/product/category/${props.categoryId}`);
  }

  return /* html */ `
    ${productGridStyle}
    <ul class="grid">
    ${products.datas
      .map((product) => {
        const { _id, productName, category, price, imagePath, info } = product;

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
