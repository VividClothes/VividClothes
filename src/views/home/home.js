import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';

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

// 이미지 슬라이드 기능
const slide = document.querySelector('.slide');
const mainImageContainer = document.querySelector('.main-img-container');

(async () => {
  const result = await Api.get('/product/main');

  const bestItems = getBestItems(result.popularProducts);
  const recentItems = getRecentItems(result.recentProducts);

  const bestItemsImagePaths = bestItems.map((item) => item.imagePath);
  slide.style.backgroundImage = `url("${bestItemsImagePaths[0]}")`;

  let slideIndex = 0;
  showSlides();

  mainImageContainer.insertAdjacentHTML('beforeend', makeMainImageHTML(bestItems));

  function showSlides() {
    slideIndex++;
    slide.style.backgroundImage = `url("${bestItemsImagePaths[slideIndex]}")`;
    if (slideIndex === bestItemsImagePaths.length - 1) {
      slideIndex = -1;
    }

    setTimeout(showSlides, 3000);
  }

  renderNewProducts(recentItems);
})();

function makeMainImageHTML(bestItems) {
  return `
  <div class="img1"
  style='background-image: url("${bestItems[0].imagePath}")'
  onclick='window.location.href="/product?id=${bestItems[0].productId}"'>
    <div class="imgFloat"><div>BEST ${bestItems[0].category}</div></div>
  </div>
  <div class="img2"
  style='background-image:url("${bestItems[1].imagePath}")'
  onclick='window.location.href="/product?id=${bestItems[1].productId}"'>
    <div class="imgFloat"><div>BEST ${bestItems[1].category}</div></div>
  </div>
  <div class="img3"
  style='background-image:url("${bestItems[2].imagePath}")'
  onclick='window.location.href="/product?id=${bestItems[2].productId}"'>
    <div class="imgFloat"><div>BEST ${bestItems[2].category}</div></div>
  </div>
  <div class="img4"
  style='background-image:url("${bestItems[3].imagePath}")'
  onclick='window.location.href="/product?id=${bestItems[3].productId}"'>
    <div class="imgFloat"><div>BEST ${bestItems[3].category}</<div>></div>
  </div>
  `;
}

function getBestItems(items) {
  return items.map((item) => {
    return {
      category: item.product.category.categoryName,
      imagePath: item.product.imagePath[0],
      productId: item.product._id,
      productName: item.product.productName,
      price: item.product.price,
      info: item.product.info,
    };
  });
}

function getRecentItems(items) {
  return items.map((item) => {
    return {
      category: item.category.categoryName,
      imagePath: item.imagePath[0],
      productId: item._id,
      productName: item.productName,
      price: item.price,
      info: item.info,
    };
  });
}

// 신상품 렌더링
function renderNewProducts(recentItems) {
  const categoryName = document.querySelector('.category-name');
  const productGrid = document.querySelector('.main-content');

  // grid
  categoryName.innerHTML = `
  <h2 class="title is-2">
    <span class="is-italic is-capitalized is-size-4 ">New Arrivals</span>
  </h2>
  <hr>

  `;

  createProductsList(recentItems);

  async function createProductsList(products) {
    console.log(products);
    const insertedEl = products
      .map(({ productId, productName, price, imagePath, info }) => {
        return `
        <li class="col">
          <a class="a-link" href=/product?id=${productId}&page=1>
            <div class="card">
              <div class="card-image">
                <div class="img-container">
                  <img class="grid-img" src=${imagePath} alt=${productName} />
                  <div class="buynow">Buy Now</div>
                </div>
              </div>
            </a>
              
              <div>
                <div class="medias">
                  <div class="media-content">
                    <a class="a-link" href=/product?id=${productId}&page=1><p class="title font-16">${productName}</p></a>
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
}
