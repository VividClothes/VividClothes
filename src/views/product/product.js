import * as Api from '/api.js';
import { header } from '/header.js';

/***************************헤더 내용**********************************/
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
/*********************************************************************/


// 즉시실행 함수로 바로 실행
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('id');
    const result = await Api.get(`/product/${productID}`);
    console.log(result);
})();



/********************수량 버튼 이벤트*********************************/
const quantity = document.querySelector('.quantity');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');

// 수량 증가 버튼
upButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    let quantityNum = parseInt(quantity.value);

    if (quantityNum === 99) {
        alert('1 이상 99 이하의 수량만 가능합니다.');
    } else {
        quantityNum++;
        quantity.value = quantityNum;
    }
})

// 수량 감소 버튼
downButton.addEventListener('click', (e) => {
    e.preventDefault();

    let quantityNum = parseInt(quantity.value);

    if (quantityNum === 1) {
        alert('1 이상 99 이하의 수량만 가능합니다.');
    } else {
        quantityNum--;
        quantity.value = quantityNum;
    }
})
/*********************************************************************/


// 임의로 입력 검사
quantity.addEventListener('input', (e) => {
    const quantityNum = parseInt(e.target.value);
    if (quantityNum > 99 || quantityNum < 1) {
        alert('1 이상 99 이하의 수량만 가능합니다.');
        e.target.value = 1;
    }
})