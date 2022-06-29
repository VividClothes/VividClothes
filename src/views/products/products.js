import * as Api from '/api.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';
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

const layoutContainer = document.getElementById('layout');
const titleSectionContainer = document.getElementById('title-section');
const categoryName = document.querySelector('.category-name');
const productGrid = document.querySelector('.main-content');
const pagination = document.getElementById('pagination');

const categoryHash = {};

const urlParams = new URLSearchParams(window.location.search);
const categoryTarget = urlParams.get('category');
const searchInput = urlParams.get('searchInput');

async function render() {
  await addAllElements();
  addAllEvents();
}

async function addAllElements() {
  layoutContainer.insertAdjacentHTML('afterbegin', layout());

  const title = categoryTarget ? 'Category' : 'Search';
  const subTitle = categoryTarget ? categoryTarget : searchInput;

  titleSectionContainer.insertAdjacentHTML(
    'afterbegin',
    titleSection({
      title: title,
      subTitle: subTitle,
    })
  );

  await createCategoryHash();

  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');

  const perPage = 10;
  let products;

  if (categoryTarget) {
    products = await Api.get(
      `/product/category`,
      `${categoryHash[categoryTarget]}?page=${page}&perPage=${perPage}`
    );
  } else if (searchInput) {
    products = await Api.get('/product/search', `${searchInput}?page=${page}&perPage=${perPage}`);
    console.log(products);
  }

  createProductsList(products);

  let pageData = {
    page: products.page,
    perPage: products.perPage,
    totalPage: products.totalPage,
  };

  if (categoryTarget) {
    pageData = {
      ...pageData,
      pageUrl: (page) => `/products/?category=${categoryTarget}&page=${page}`,
    };
  } else if (searchInput) {
    pageData = {
      ...pageData,
      pageUrl: (page) => `/products/?searchInput=${searchInput}&page=${page}`,
    };
  }

  pagination.insertAdjacentHTML('afterbegin', await createPaginationBar({ data: pageData }));
}

function addAllEvents() {
  addPaginationBarListener(pagination);
}

// // grid - 카테고리인지, 검색어인지 구분할 필요 있음. 공유 함수 아님
// if (categoryTarget) {
//   categoryName.innerHTML = `
//   <h2 class="title is-2">
//     Category / <span class="is-italic is-capitalized is-size-4 ">${categoryTarget}</span>
//   </h2>
//   <hr>
//   `;
// } else if (searchInput) {
//   categoryName.innerHTML = `
//   <h2 class="title is-2">
//     Search / <span class="is-italic is-capitalized is-size-4 ">${searchInput}</span>
//   </h2>
//   <hr>
//   `;
// }

// 리스트에 카테고리 입력용. 공유함수.
async function createCategoryHash() {
  const categories = await Api.get('/category/list');
  categories.forEach(({ _id, categoryName }) => {
    categoryHash[categoryName] = _id;
  });
}

// 제품 목록 HTML 생성. 공유 함수.
function createProductsList(products) {
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
