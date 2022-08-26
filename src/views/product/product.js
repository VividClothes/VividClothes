import { addCommas, convertToNumber, maskingFunc, getDate } from '/useful-functions.js';
import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import { createPaginationBar, addPaginationBarListener } from '/pagination/pagination-bar.js';
import { 
  handleUpDownButton, 
  handleQuantityInput,
  handleCancelButton,
  handlePrevBox,
  handleNextBox,
  imageSlideArrow,
  handleBuyButton,
  handleCartButton,
  makeReviewContainerHTML,
  makeItemContainerHTML
} from '/product/handler-functions.js';

/******************************필요 요소*****************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
const imageContainer = document.querySelector('.image-container');
const mainImage = document.querySelector('.main-image');
const productName = document.querySelector('.product-name');
const productInfo = document.querySelector('.product-info');
const priceText = document.querySelector('.price-text');

const optionContainer = document.querySelector('.option-container');
const sizeSelectBox = document.querySelector('.size-select');
const colorSelectBox = document.querySelector('.color-select');
const totalPriceSum = document.querySelector('.total-price-text');

const selectedContainer = document.querySelector('.product-selected-container');

const buyButton = document.querySelector('.buy-container');
const cartButton = document.querySelector('.cart-container');

const prevBox = document.querySelector('.prev-box');
const nextBox = document.querySelector('.next-box');

const reviewContainerTitle = document.querySelector('.review-container-title');
const reviewBody = document.querySelector('.review-container-helper');
const pagination = document.getElementById('pagination');

const selectedSizeColor = { size: '', color: '' };
let optionKeys = [];
/*******************************************************************/



(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productID = urlParams.get('id');
  const page = urlParams.get('page');
  const perPage = 5;
  const [categories, results, reviewResult] = await Promise.all([
    Api.get('/category/list'),
    Api.get(`/product/id`, `${productID}`),
    Api.get(
      `/review/product`,
      `${productID}?page=${page}&perPage=${perPage}`
    )
  ]);

  /***************************헤더*************************************/
  nav.insertAdjacentElement('afterbegin', header);
  //const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
  /*******************************************************************/

  /****************************렌더링**********************************/
  const result = results.product;

  mainImage.src = `${result.imagePath[0]}`;
  productName.textContent = result.productName;
  productInfo.textContent = result.info;
  priceText.textContent = addCommas(result.price);
  totalPriceSum.textContent = 0;

  let currentImageIndex = 0;
  const imagePaths = result.imagePath;
  
  result.option.size.forEach((size) => {
    sizeSelectBox.innerHTML += `<option value="${size}">${size}</option>`;    
  })

  result.option.color.forEach((color) => {
    colorSelectBox.innerHTML += `<option value="${color}">${color}</option>`;    
  })
  

  /********************옵션 박스 선택 이벤트*********************/
  optionContainer.addEventListener('change', (e) => {
    e.target.name === 'size' ?
    selectedSizeColor.size = e.target.value :
    selectedSizeColor.color = e.target.value
    
    const size = selectedSizeColor.size;
    const color = selectedSizeColor.color;

    // 둘 다 선택되면 아이템 컴포넌트 추가
    const isAllChecked = size && color;
    if (isAllChecked) {
      const optionKey = `${size}${color}`;

      // 같은 옵션을 이미 선택했는지 검사
      const isAlreadyChecked = optionKeys.some((elem) => elem === optionKey);

      // 이미 선택한 경우는 pass
      if (isAlreadyChecked) {
        alert('이미 선택한 옵션입니다.');
        resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
      }

      // 선택하지 않은 옵션인 경우 컴포넌트 추가
      else {
        optionKeys.push(`${size}${color}`); // 사이즈+색 문자열 저장
        selectedContainer.insertAdjacentHTML(
          'beforeend',
          makeItemContainerHTML(size, color, result.price)
        );

        resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
        setTotalPriceSum();
        checkSize();
        const newElement = selectedContainer.lastElementChild;
        const upButton = newElement.querySelector('.up-button');
        const downButton = newElement.querySelector('.down-button');
        const quantityInput = newElement.querySelector('.quantity');
        const cancelButton = newElement.querySelector('.cancel');

        // 수량 증가 버튼 이벤트 등록 
        upButton.addEventListener('click', (e) => handleUpDownButton(e, result, 'up', setTotalPriceSum));
        
        // 수량 감소 버튼 이벤트 등록
        downButton.addEventListener('click', (e) => handleUpDownButton(e, result, 'down', setTotalPriceSum));
        
        // 수량 직접 입력 이벤트 등록
        quantityInput.addEventListener('change', (e) => handleQuantityInput(e, result, setTotalPriceSum))

        // 취소 버튼 이벤트 등록
        cancelButton.addEventListener('click', (e) => optionKeys = handleCancelButton(e, optionKeys, setTotalPriceSum));
      }
    }
  })
  

  /********************이미지 슬라이드 이벤트*********************/
  prevBox.addEventListener('click', (e) => currentImageIndex = handlePrevBox(e, currentImageIndex, imagePaths, mainImage))

  nextBox.addEventListener('click', (e) => currentImageIndex = handleNextBox(e, currentImageIndex, imagePaths, mainImage))
  /*************************************************************/


  /********************슬라이더 화살표 표시***********************/
  imageSlideArrow(imagePaths, imageContainer, prevBox, nextBox)
  /*************************************************************/


  /********************BUY IT NOW 클릭 이벤트********************/
  buyButton.addEventListener('click', (e) => handleBuyButton(e, optionKeys, result))
  /*************************************************************/


  /*******************ADD TO CART 클릭 이벤트********************/
  cartButton.addEventListener('click', (e) => handleCartButton(e, optionKeys, result));
  /*************************************************************/


  /************************리뷰 렌더링**************************/
  const reviews = results.reviews.datas;

  const pageData = {
    page: reviewResult.page,
    perPage: reviewResult.perPage,
    totalPage: reviewResult.totalPage,
    pageUrl: (page) => `/product/?id=${productID}&page=${page}`,
  };

  pagination.insertAdjacentHTML('afterbegin', await createPaginationBar({ data: pageData }));
  addPaginationBarListener(pagination);

  reviewContainerTitle.textContent = `구매후기(${reviews.length})`;

  reviews.forEach((review) => {
    reviewBody.insertAdjacentHTML('beforeend', makeReviewContainerHTML(review));
  });
})();


function resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor) {
  sizeSelectBox.value = sizeSelectBox[0].value;
  colorSelectBox.value = colorSelectBox[0].value;
  selectedSizeColor.size = '';
  selectedSizeColor.color = '';
}

function setTotalPriceSum() {
  const totalPrices = document.getElementsByClassName('price-sum');
  const sum = Array.from(totalPrices).reduce((sum, elem) => {
    return sum + convertToNumber(elem.textContent);
  }, 0);
  totalPriceSum.textContent = addCommas(sum);
}

function checkSize() {
  const selectedContainer = document.querySelector('.product-selected-container');
  const selectedOption = document.querySelector('.selected-option');

  const height = selectedContainer.offsetHeight;
  const unitHeight = selectedOption.offsetHeight;

  if (height > 250) {
    selectedContainer.style.height = `${unitHeight * 5}px`;
    selectedContainer.style.overflowY = 'scroll';
  }
}
