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
const mainImage = document.querySelector('.main-image');
const productName = document.querySelector('.product-name');
const productInfo = document.querySelector('.product-info');
const priceText = document.querySelector('.price-text');
// const sizeText = document.querySelector('.size-text');
// const colorText = document.querySelector('.color-text');
const sizeSelectBox = document.querySelector('.size-select');
const colorSelectBox = document.querySelector('.color-select');
const totalPriceText = document.querySelector('.total-price-text');

const selectedContainer = document.querySelector('.product-selected-container');
const selectedOption = document.querySelector('.selected-option');

const quantity = document.querySelector('.quantity');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');

const buyButton = document.querySelector('.buy-container');
const cartButton = document.querySelector('.cart-container');

const prevBox = document.querySelector('.prev-box');
const nextBox = document.querySelector('.next-box');
/*********************************************************************/


const selectedSizeColor = { size: '', color: '' };
const optionKeys = [];
let price;


/****************************렌더링**********************************/
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('id');
    let result = await Api.get(`/product/${productID}`);
    result = result.product;
    console.log(result);

    mainImage.src = `${result.imagePath[0]}`;
    productName.textContent = result.productName;
    productInfo.textContent = result.info;
    priceText.textContent = addCommas(result.price);
    //sizeText.textContent = result.option.size[0];
    //colorText.textContent = result.option.color[0];
    totalPriceText.textContent = addCommas(result.price);

    let currentImageIndex = 0;
    const imagePaths = result.imagePath;


    // 선택된 상품들 
    const height = selectedContainer.offsetHeight;
    const unitHeight = selectedOption.offsetHeight;
    console.log(height)
    if(height > 250) {
        selectedContainer.style.height = `${unitHeight * 5}px`;
        selectedContainer.style.overflowY = 'scroll';
    }



    /********************사이즈 박스 선택 이벤트*********************/
    sizeSelectBox.addEventListener('change', (e) => {
        
        selectedSizeColor.size = e.target.value; // 값 변경
        const size = selectedSizeColor.size;
        const color = selectedSizeColor.color;

        // 둘 다 선택되면 아이템 컴포넌트 추가
        const isAllChecked = size && color;
        if (isAllChecked) {
            const optionKey = `${size}${color}`;

            // 같은 옵션을 이미 선택했는지 검사
            const isAlreadyChecked = optionKeys.some(elem => elem === optionKey);
            
            // 이미 선택한 경우는 pass
            if (isAlreadyChecked) {
                alert('이미 선택한 옵션입니다.');
                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            } 
            
            // 선택하지 않은 옵션인 경우 컴포넌트 추가
            else {
                optionKeys.push(`${size}${color}`); // 사이즈+색 문자열 저장
                selectedContainer.insertAdjacentHTML('beforeend', 
                    makeItemContainerHTML(size, color, result.price));

                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            }
        }
    })
    /*************************************************************/



    /********************색상 박스 선택 이벤트*********************/
    colorSelectBox.addEventListener('change', (e) => {
        selectedSizeColor.color = e.target.value; // 값 변경
        const size = selectedSizeColor.size;
        const color = selectedSizeColor.color;


        // 둘 다 선택되면 아이템 컴포넌트 추가
        const isAllChecked = size && color;
        if (isAllChecked) {
            const optionKey = `${size}${color}`;

            // 같은 옵션을 이미 선택했는지 검사
            const isAlreadyChecked = optionKeys.some(elem => elem === optionKey);
            
            // 이미 선택한 경우는 pass
            if (isAlreadyChecked) {
                alert('이미 선택한 옵션입니다.');
                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            } 
            
            // 선택하지 않은 옵션인 경우 컴포넌트 추가
            else {
                optionKeys.push(`${size}${color}`); // 사이즈+색 문자열 저장
                selectedContainer.insertAdjacentHTML('beforeend', 
                    makeItemContainerHTML(size, color, result.price));

                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            }
        }
    })
    /*************************************************************/



    /********************이미지 슬라이드 이벤트*********************/
    prevBox.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentImageIndex === 0) {
            currentImageIndex = imagePaths.length - 1;
        } else {
            currentImageIndex--;
        }

        mainImage.src = `${imagePaths[currentImageIndex]}`;
    })

    nextBox.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentImageIndex === imagePaths.length - 1) {
            currentImageIndex = 0;
        } else {
            currentImageIndex++;
        }

        mainImage.src = `${imagePaths[currentImageIndex]}`;
    })
    /*************************************************************/



    /********************슬라이더 화살표 표시***********************/
    if (imagePaths.length > 1) {
        imageContainer.addEventListener('mouseover', (e) => {
            prevBox.style.visibility = 'visible';
            nextBox.style.visibility = 'visible';
        })

        imageContainer.addEventListener('mouseout', (e) => {
            prevBox.style.visibility = 'hidden';
            nextBox.style.visibility = 'hidden';
        })
    }
    /*************************************************************/



    /********************수량 버튼 이벤트**************************/
    // 수량 증가 버튼
    upButton.addEventListener('click', (e) => {
        e.preventDefault();
        const totalPriceText = e.target.parentNode.nextElementSibling;
        const quantity = e.target.previousElementSibling;
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
        const totalPriceText = e.target.parentNode.nextElementSibling;
        const quantity = e.target.nextElementSibling;
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


function makeItemContainerHTML(size, color, price) {
    return `
    <div class="selected-option">
        <div class="option-text option-sort-helper">${size} / ${color}</div>
        <div class="quantity-container option-sort-helper">
            <span class="fa-solid fa-minus quantity-wrap down-button"></span>
            <input class="quantity" value="1" type="text">
            <span class="fa-solid fa-plus quantity-wrap up-button"></span>
        </div> 
        <div class="price-sum option-sort-helper">${addCommas(price)}원</div>   
        <div class="cancel option-sort-helper">x</div>
    </div>
    `
}


function resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor) {
    sizeSelectBox.value = sizeSelectBox[0].value;
    colorSelectBox.value = colorSelectBox[0].value;
    selectedSizeColor.size = '';
    selectedSizeColor.color = '';
}