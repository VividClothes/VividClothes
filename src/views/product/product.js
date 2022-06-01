import * as Api from '/api.js';
import { addCommas, convertToNumber } from '/useful-functions.js';
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

const buyButton = document.querySelector('.buy-container');
const cartButton = document.querySelector('.cart-container');
/*********************************************************************/



/****************************렌더링**********************************/
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('id');
    let result = await Api.get(`/product/${productID}`);
    result = result.product;

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

        if (!quantityNum) {
            quantity.value = 1;
            totalPriceText.textContent = addCommas(result.price);
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

        if (!quantityNum) {
            quantity.value = 1;
            totalPriceText.textContent = addCommas(result.price);
        }
    })
    /*************************************************************/



    /*********************수량 직접 입력***************************/
    quantity.addEventListener('change', (e) => {
        const quantityNum = parseInt(e.target.value);
        if (quantityNum >= 1 && quantityNum <= 99) {
            totalPriceText.textContent = addCommas(quantityNum * result.price);
        } else {
            alert('1 이상 99 이하의 수량만 가능합니다.');
            quantity.value = 1;
            totalPriceText.textContent = addCommas(result.price);
        }
    })
    /*************************************************************/



    /********************BUY IT NOW 클릭 이벤트********************/
    buyButton.addEventListener('click', (e) => {
        e.preventDefault();

        const hashedEmail = localStorage.getItem('hashedEmail');
        
        // 로그인 안했으면 로그인으로 이동
        if (!hashedEmail) {
            window.location.href = '/login';
        }

        // indexedDB에 삽입할 요소
        const data = {
            productId: result._id,
            imagePath: result.imagePath[0],
            productName: result.productName,
            color: result.option.color[0],
            size: result.option.size[0],
            quantity: Number(quantity.value),
            price: result.price
        }

        //indexedDB order 요소 삭제 후 저장
        const onRequest = indexedDB.open(hashedEmail, 1);
        onRequest.onsuccess = async () => {
            const db = onRequest.result;
            const transaction = db.transaction('order', 'readwrite');
            await transaction.objectStore('order').clear();
            await transaction.objectStore('order').add(data);
            window.location.href = '/order?storeName=order';   
        }
    })
    /*************************************************************/



    /*******************ADD TO CART 클릭 이벤트********************/
    cartButton.addEventListener('click', (e) => {
        e.preventDefault();

        const hashedEmail = localStorage.getItem('hashedEmail');
        
        // 로그인 안했으면 로그인으로 이동
        if (!hashedEmail) {
            window.location.href = '/login';
        }
        
        // indexedDB에 삽입할 요소
        const data = {
            productId: result._id,
            imagePath: result.imagePath[0],
            productName: result.productName,
            color: result.option.color[0],
            size: result.option.size[0],
            quantity: Number(quantity.value),
            price: result.price
        }
        //indexedDB order 요소 추가 저장
        const onRequest = indexedDB.open(hashedEmail, 1);
        
        onRequest.onsuccess = async () => {
            const db = onRequest.result;
            const transaction = db.transaction('cart', 'readwrite');
            await transaction.objectStore('cart').add(data);
            alert('장바구니에 추가 되었습니다.')
        }
    })
    /*************************************************************/
})();