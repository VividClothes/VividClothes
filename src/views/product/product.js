import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';
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



/****************************요소 모음**********************************/
const imageContainer = document.querySelector('.image-container');
const productName = document.querySelector('.product-name');
const productInfo = document.querySelector('.product-info');
const priceText = document.querySelector('.price-text');
const sizeText = document.querySelector('.size-text');
const colorText = document.querySelector('.color-text');
const totalPriceText = document.querySelector('.total-price-text');

const quantity = document.querySelector('.quantity');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
/*********************************************************************/



/****************************렌더링**********************************/
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('id');
    const result = await Api.get(`/product/${productID}`);
    console.log(result);

    imageContainer.style.backgroundImage = `url( "${result.imagePath[0]}" )`;
    productName.textContent = result.productName;
    productInfo.textContent = result.info;
    priceText.textContent = addCommas(result.price);
    sizeText.textContent = result.option.size[0];
    colorText.textContent = result.option.color[0];
    totalPriceText.textContent = addCommas(result.price);



    /********************수량 버튼 이벤트**************************/
    // 수량 증가 버튼
    upButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        let quantityNum = parseInt(quantity.value);

        if (quantityNum === 99) {
            alert('1 이상 99 이하의 수량만 가능합니다.');
        } else {
            quantityNum++;
            quantity.value = quantityNum;
            totalPriceText.textContent = addCommas(quantityNum * result.price);
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
            totalPriceText.textContent = addCommas(quantityNum * result.price);
        }
    })
    /*************************************************************/



    /*********************수량 직접 입력***************************/
    quantity.addEventListener('input', (e) => {
        const quantityNum = parseInt(e.target.value);
        if (quantityNum > 99 || quantityNum < 1) {
            alert('1 이상 99 이하의 수량만 가능합니다.');
            e.target.value = 1;
            totalPriceText.textContent = addCommas(result.price);
        } else { 
            totalPriceText.textContent = addCommas(quantityNum * result.price);
        }
    })
    /*************************************************************/
})();