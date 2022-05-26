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
categoryName.innerHTML = `
<h2 class="title is-2">
  Category / <span class="is-italic is-capitalized is-size-4 ">${categoryTarget}</span>
</h2>
<hr>

`;

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

async function createProductsList() {
  const products = await Api.get(`/product/category/${categoryHash[categoryTarget]}`);
  const insertedEl = products
    .map(({ _id, productName, category, price, imagePath, info, option }) => {
      return `
      <li class="col">
        <a class="a-link" href=/product?id=${_id}>
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
                  <a class="a-link" href=/product?id=${_id}><p class="title font-16">${productName}</p></a>
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
  console.log(products);

  productGrid.innerHTML = `<ul class="grid">${insertedEl}</ul>`;
}
