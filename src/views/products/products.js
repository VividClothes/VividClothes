import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import { header, categoryHash } from '/header.js';

const categoryName = document.querySelector('.category-name');
const productGrid = document.querySelector('.main-content');

const urlParams = new URLSearchParams(window.location.search);
const categoryTarget = urlParams.get('category');

// createProductsList();

// grid
categoryName.innerHTML = categoryTarget;
productGrid.innerHTML = `
<div>
sda
</div>
<div>sadsa</div>
<div>asdsa</div>
<div>sadasd</div>
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

async function createProductsList() {
  const products = await Api.get(`/product/category/${categoryHash[categoryTarget]}`);
  const { productName, price, image, info } = products;
  console.log(productName, price, image, info);

  const template = `  
  <div class="tile is-parent">
    <article class="tile is-child box">
      <figure class="image is-3by2">
        <img src="https://bulma.io/images/placeholders/640x480.png">
      </figure>
      <p></p>
    </article>
  </div>`;
}
