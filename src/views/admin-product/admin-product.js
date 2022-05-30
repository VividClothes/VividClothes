import * as Api from '/api.js';
import { header } from '/header.js';
// import Header from '/header/header.js';
// import Modal from '/modal/modal.js';
// import Layout from '/layout/layout.js';
// import TitleSection from '/layout/title-section.js';
// import { createCustomElements } from '/create-custom-elements.js';

// Web Components
// const customs = {
//   ['custom-header']: Header,
//   ['custom-modal']: Modal,
//   ['custom-layout']: Layout,
//   ['custom-title-section']: TitleSection,
// };

// // 총괄 함수
// async function startApp() {
//   const products = await getAllProducts();
//   createDOM();
// }

// async function getAllProducts() {
//   const products = await Api.get('/product/list');
//   return products;
// }

// function createDOM() {
//   createCustomElements(customs);
// }

// startApp();

// function createOptions() {}

const categoryName = document.querySelector('.category-name');
const productGrid = document.querySelector('.main-content');
const categoryHash = {};

createCategoryHash().then(() => {
  const options = Object.keys(categoryHash)
    .map((category) => {
      return `
      <option value=${category}>${category}</option>
    `;
    })
    .join('');

  categoryName.innerHTML = `
  <div class="flex-div">
    <h2 class="title-2 is-2">
      관리자 설정 / <span class="is-italic is-capitalized is-size-4 ">상품 관리</span>
    </h2>
    <div class="left-side">
    <div class="select">
      <select id="select-box">
        <option value="default">전체</option>
        ${options}
      </select>
    </div>
      <button id="add-product" class="button-add"><i class="fa-solid fa-plus"></i></button>
    </div>
  </div>
  <hr>
`;
  Api.get(`/product/list`).then((products) => {
    createProductsList(products);
    const selectBox = document.querySelector('#select-box');
    // const addProductButton = document.getElementById('add-product');
    // const editProductButtons = document.querySelectorAll('.edit-product');
    // const customModal = document.querySelector('uc-modal');

    selectBox.addEventListener('change', getSelected);

    // addProductButton.addEventListener('click', () => {
    //   customModal.setAttribute('type', 'ADD_PRODUCT_MODAL');
    //   customModal.setAttribute('is-open', true);
    // });

    // editProductButtons.forEach((btn) => {
    //   btn.addEventListener('click', () => {
    //     customModal.setAttribute('type', 'EDIT_PRODUCT_MODAL');
    //     customModal.setAttribute('is-open', true);
    //   });
    // });
  });
});

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

// 카테고리 요청 중복(이미 카테고리 컴포넌트에서 요청하였음) -> 그냥 id 값으로 페이지 전환해도 될듯.. 해당 funtion 필요없음
async function createCategoryHash() {
  const categories = await Api.get('/category/list');
  categories.forEach(({ _id, categoryName }) => {
    categoryHash[categoryName] = _id;
  });
}

function createProductsList(products) {
  const insertedEl = products
    .map(({ _id, productName, category, price, imagePath, info, option }) => {
      return `
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
              <div class="medias">
                <div class="media-content">
                  <a class="a-link" href=/product?id=${_id}><p class="title font-16">${productName}</p></a>
                </div>
              </div>

              <div class="contents">
                <p class="font-15">${info}</p>
                <div class="button-container">
                  <button class="edit-product buttonss has-background-info-dark">수정</button>
                  <button class="delete-product buttonss has-background-danger">삭제</button>
                </div>
                <p class="subtitle"><i class="fa-solid fa-won-sign"></i> ${price.toLocaleString()}</p>
              </div>
            </div>
          </div>

      </li>`;
    })
    .join('');
  console.log(products);

  productGrid.innerHTML = `<ul class="grid">${insertedEl}</ul>`;
}

async function getSelected() {
  console.log(this.value);
  const products =
    this.value !== 'default'
      ? await Api.get(`/product/category/${categoryHash[this.value]}`)
      : await Api.get(`/product/list`);

  createProductsList(products);
}
