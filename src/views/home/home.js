import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';

/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async () => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML(
    'afterbegin',
    await createCategory({ categories })
  );
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/


homeImageEvents();


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



// 홈 이미지 이벤트 리스너 등록 (마우스 호버시 글자 및 배경색 변화)
function homeImageEvents() {
  const imgFloats = document.getElementsByClassName('imgFloat');
  for (let elem of imgFloats) {
    elem.addEventListener('mouseover', (e) => {
      e.target.style.color = 'rgb(0,0,0,1)';
      e.target.style.backgroundColor = 'rgb(255,255,255, 0.9)';
    });

    elem.addEventListener('mouseout', (e) => {
      e.target.style.color = 'rgb(0,0,0,0)';
      e.target.style.backgroundColor = 'rgb(255,255,255,0)';
    });
  }
}