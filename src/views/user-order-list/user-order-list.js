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
const itemsBody = document.querySelector('.items-body');
/*********************************************************************/



(async () => {
  // 데이터 불러오기
  const orderedProducts = await Api.get(`/order/mylist`);
  console.log(orderedProducts);

  /***********************주문내역 없을때 렌더링****************************/
  if(orderedProducts.length === 0) {
    itemsBody.insertAdjacentHTML('beforeend', makeNoItemContainerHTML());
  } 
  /***********************************************************************/


  /********************주문내역 하나라도 있을때 렌더링***********************/
  else {
    
  }
  /************************************************************************/
})()


function makeItemContainerHTML(product, orderId, orderDate) {
  return `
  <div class="item-container">
    <div class="product-info">
      <div class="image-box"></div>
      <div class="options-box">
        <div class="product-name">${product.productName}</div>
        <div class="options">옵션: FREE / RED</div>
      </div>
    </div>
    <div class="order-date">2022-05-28</div>
    <div class="price-quantity">
      <div class="price">24,000원</div>
      <div class="quantity">1개</div>
    </div>
    <div class="order-state-box">
      <div class="order-state-text">상품 배송중</div>
    </div>
    <div class="order-detail">
      <a href="#" class="order-detail-link">주문 상세보기</a>
    </div>
  </div>
  `
}


function makeNoItemContainerHTML() {
  return '<div class="no-item-container">주문 내역이 없습니다.</div>';
}