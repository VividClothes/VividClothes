import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener} from '/category/category.js';


/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async() => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/



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


async function createCategoryHash() {
  const categories = await Api.get('/category/list');
  categories.forEach(({ _id, categoryName }) => {
    categoryHash[categoryName] = _id;
  });
}

async function createProductsList() {
  const products = await Api.get(`/product/category/${categoryHash[categoryTarget]}`);
  const insertedEl = products.datas
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
