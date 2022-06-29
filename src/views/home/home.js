import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import {
  handleResize,
  getPerPage,
  getBestItems,
  getRecentItems,
  makeMainImageHTML,
  renderNewProducts
} from '/home/handler-functions.js';


/******************************필요 요소*****************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
const fetchMoreTrigger = document.querySelector("#fetchMore");
const productGrid = document.querySelector('.grid');
const slide = document.querySelector('.slide');
const mainImageContainer = document.querySelector('.main-img-container');
let [timer, page, perPage] = [null, 1, getPerPage(window.innerWidth)];
/*******************************************************************/


(async () => {

  /***************************헤더*************************************/
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
  /*******************************************************************/
  

  /**************************이미지 슬라이드*******************************/
  const best_result = await Api.get('/product/main');
  const recent_result = await Api.get('/product/main/recent', `?page=${page}&perPage=${perPage}`)
  
  const bestItems = getBestItems(best_result);
  const recentItems = getRecentItems(recent_result.datas);

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

  renderNewProducts(recentItems, productGrid);
  /*******************************************************************/


  /******************************무한 스크롤********************************/
  window.addEventListener('resize', (e) => [timer, perPage] = handleResize(e, timer, perPage));

  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => { if (isIntersecting) fetchMore() });
  fetchMoreObserver.observe(fetchMoreTrigger);

  const fetchMore = async () => {
    fetchMoreTrigger.classList.add("loading");

    const list = await Api.get('/product/main/recent', `?page=${++page}&perPage=${perPage}`)
    const recentItems = getRecentItems(list.datas);
    renderNewProducts(recentItems, productGrid)

    fetchMoreTrigger.classList.remove("loading");
  };

  /*******************************************************************/
})();
