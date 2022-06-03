import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import { createPaginationBar, addPaginationBarListener } from '/pagination/pagination-bar.js';

/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async () => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/

const categoryName = document.querySelector('.category-name');
const productGrid = document.querySelector('.main-content');
const pagination = document.getElementById('pagination');

const categoryHash = {};

const urlParams = new URLSearchParams(window.location.search);
const categoryTarget = urlParams.get('category');

async function render() {
  await addAllElements();
  addAllEvents();
}

async function addAllElements() {
  await createCategoryHash();

  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const perPage = 10;

  const products = await Api.get(
    `/product/category`,
    `${categoryHash[categoryTarget]}?page=${page}&perPage=${perPage}`
  );

  console.log(products);

  await createProductsList(products);

  const pageData = {
    page: products.page,
    perPage: products.perPage,
    totalPage: products.totalPage,
    pageUrl: (page) => `/products/?category=${categoryTarget}&page=${page}`,
  };

  pagination.insertAdjacentHTML('afterbegin', await createPaginationBar({ data: pageData }));
}

function addAllEvents() {
  addPaginationBarListener(pagination);
}

// grid
categoryName.innerHTML = `
<h2 class="title is-2">
  Category / <span class="is-italic is-capitalized is-size-4 ">${categoryTarget}</span>
</h2>
<hr>
`;

async function createCategoryHash() {
  const categories = await Api.get('/category/list');
  categories.forEach(({ _id, categoryName }) => {
    categoryHash[categoryName] = _id;
  });
}

async function createProductsList(products) {
  const insertedEl = products.datas
    .map(({ _id, productName, category, price, imagePath, info, option }) => {
      return `
      <li class="col">
        <a class="a-link" href=/product?id=${_id}&page=1>
          <div class="card">
            <div class="card-image">
              <div class="img-container">
                <img class="grid-img" src=${imagePath[0]} alt=${productName} />
                <div class="buynow">Buy Now</div>
              </div>
            </div>
          </a>
            
            <div>
              <div class="medias">
                <div class="media-content">
                  <a class="a-link" href=/product?id=${_id}&page=1><p class="title font-16">${productName}</p></a>
                </div>
              </div>

              <div class="contents">
                <p class="font-15">${info}</p>
                <p class="subtitle"><i class="fa-solid fa-won-sign"></i> ${price.toLocaleString()}</p>
              </div>
            </div>
          </div>
      
      </li>`;
    })
    .join('');

  productGrid.innerHTML = `<ul class="grid">${insertedEl}</ul>`;
}

render();
