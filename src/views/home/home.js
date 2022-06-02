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




// 이미지 슬라이드 기능
const slide = document.querySelector('.slide');
slide.style.backgroundImage = 'url( "/home-slide1.jpg" )';

const imageURLs = [
  'url("/home-slide1.jpg"',
  'url("/home-slide2.jpg"',
  'url("/home-slide3.png"',
  'url("/home-slide4.jpeg"',
];

let slideIndex = 0;
showSlides();

function showSlides() {
  slideIndex++;
  slide.style.backgroundImage = imageURLs[slideIndex];
  if (slideIndex === imageURLs.length - 1) {
    slideIndex = -1;
  }

  setTimeout(showSlides, 3000);
}
