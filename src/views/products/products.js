import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import { header } from '/header.js';

const categoryName = document.querySelector('.category-name');
const productGrid = document.querySelector('.main-content');

const categoryHash = {};

const urlParams = new URLSearchParams(window.location.search);
const categoryTarget = urlParams.get('category');

createCategoryHash().then(() => {
  createProductsList();
});

// grid
categoryName.innerHTML = categoryTarget;

// 요소(element), input 혹은 상수

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertHeader();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

function insertHeader() {
  document.body.insertAdjacentElement('afterbegin', header);
}

async function createCategoryHash() {
  const categories = await Api.get('/category/list');
  categories.forEach(({ _id, categoryName }) => {
    categoryHash[categoryName] = _id;
  });
}

async function createProductsList() {
  // 카테고리 요청 중복(이미 카테고리 컴포넌트에서 요청하였음) -> 추후에 수정 필요.
  const products = await Api.get(`/product/category/${categoryHash[categoryTarget]}`);
  const insertedEl = products
    .map(({ productName, category, price, imagePath, info, option }) => {
      return `
      <li class="col">
        <div class="img-container">
          <img class="grid-img" src=${imagePath[0]} alt=${productName} />
        </div>
        <br>
        <p>${productName}</p>
        <p>${info}</p>
        <p>${price}</p>
      </li>`;
    })
    .join('');
  console.log(products);

  productGrid.innerHTML = `<ul class="grid">${insertedEl}</ul>`;
}
