import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import { header } from '/header.js';

addAllElements();

async function addAllElements() {
  insertHeader();
  homeImageEvents();
}


function insertHeader() {
  document.body.insertAdjacentElement('afterbegin', header);
}



// async function getDataFromApi() {
//   // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
//   const data = await Api.get('/api/user/data');
//   const random = randomId();

//   console.log({ data });
//   console.log({ random });
// }



// 홈 이미지 이벤트 리스너 등록 (마우스 호버시 글자 및 배경색 변화)
function homeImageEvents() {
  const imgFloats = document.getElementsByClassName('imgFloat');
  for(let elem of imgFloats) {
      elem.addEventListener('mouseover', (e) => {
          e.target.style.color = 'rgb(0,0,0,1)';
          e.target.style.backgroundColor = 'rgb(255,255,255, 0.9)'
      })
      
      elem.addEventListener('mouseout', (e) => {
          e.target.style.color = 'rgb(0,0,0,0)';
          e.target.style.backgroundColor = 'rgb(255,255,255,0)'
      })
  }
}


// 이미지 슬라이드 기능
const slide = document.querySelector('.slide');
slide.style.backgroundImage = 'url( "/home-slide1.jpg" )';

const imageURLs = [
    'url("/home-slide1.jpg"',
    'url("/home-slide2.jpg"',
    'url("/home-slide3.png"',
    'url("/home-slide4.jpeg"'
]

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
