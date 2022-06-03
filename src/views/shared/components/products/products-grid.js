import * as Api from '/api.js';

import productGridStyle from '/products/products-grid-style.js';
import { createPaginationBar } from '/pagination/pagination-bar.js';

const productGrid = async (props = {}) => {
  let products;

  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const category = urlParams.get('category');
  const perPage = 10;

  let createPageUrl = (page) => `/admin-product?page=${page}`;

  if (!category || category === 'default') {
    products = await Api.get('/product', `list?page=${page}&perPage=${perPage}`);
  } else {
    products = await Api.get(`/product`, `category/${category}?page=${page}&perPage=${perPage}`);
    createPageUrl = (page) => `/admin-product?category=${category}&page=${page}`;
  }

  const pageData = {
    page: products.page,
    perPage: products.perPage,
    totalPage: products.totalPage,
    pageUrl: createPageUrl,
  };

  document.getElementById('pagination').innerHTML = await createPaginationBar({ data: pageData });

  return /* html */ `
    ${productGridStyle}
    <ul class="grid">
    ${products.datas
      .map((product) => {
        const { _id, productName, category, price, imagePath, info } = product;

        return /* html */ `
        <li class="col">
          <a class="a-link" href="/product?id=${_id}?page=1">
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
                    <a class="a-link" href="/product?id=${_id}?page=1"><p class="title font-16">${productName}</p></a>
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
