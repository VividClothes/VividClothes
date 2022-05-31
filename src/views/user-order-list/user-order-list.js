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
const productPrepareLink = document.querySelector('.product-prepare-link');
const productDeliveryLink = document.querySelector('.product-delivery-link');
const deliveryCompleteLink = document.querySelector('.delivery-complete-link');
const PREPARE = '상품 준비중';
const DELIVER = '상품 배송중';
const COMPLETE = '배송 완료';
/*********************************************************************/



(async () => {
  // 데이터 불러오기
  const orders = await Api.get(`/order/mylist`);
  let orderItems = getOrderItems(orders);
  const urlParams = new URLSearchParams(window.location.search);
  const listType = urlParams.get('type');
  console.log(orders)
  console.log(orderItems);
  
  // 상품 준비중, 상품 배송중, 배송 완료 텍스트 및 개수 표시
  setStateLinkText(orderItems);

 
  /*****************쿼리스트링 있으면 나열 리스트 필터링*********************/
  if (listType === 'prepare') {
    orderItems = orderItems.filter((order) => order.state === PREPARE)
  }
  else if(listType === 'deliver') {
    orderItems = orderItems.filter((order) => order.state === DELIVER)
  }
  else if(listType === 'complete') {
    orderItems = orderItems.filter((order) => order.state === COMPLETE);
  }
  /***********************************************************************/



  /***********************주문내역 없을때 렌더링****************************/
  if(orders.length === 0) {
    itemsBody.insertAdjacentHTML('beforeend', makeNoItemContainerHTML());
  } 
  /***********************************************************************/



  /********************주문내역 하나라도 있을때 렌더링***********************/
  else {
    orderItems.forEach((item) => {
      itemsBody.insertAdjacentHTML('beforeend', makeItemContainerHTML(item));
    })
  }
  /************************************************************************/
})()



// 개별 상품 HTML
function makeItemContainerHTML(item) {
  return `
  <div class="item-container">
    <div class="product-info">
      <div class="image-box" 
      style="background-image:url('${item.imagePath}')"
      onclick="
        window.location.href='/product?id=${item.productId}'
      "></div>
      <div class="options-box">
        <div class="product-name">${item.productName}</div>
        <div class="options">옵션: ${item.size} / ${item.color}</div>
      </div>
    </div>
    <div class="order-date">${item.createdAt}</div>
    <div class="price-quantity">
      <div class="price">${addCommas(item.priceSum)}원</div>
      <div class="quantity">${item.quantity}개</div>
    </div>
    <div class="order-state-box">
      ${stateComponent(item.state)}
    </div>
    <div class="order-detail">
      <a href="/user-order-detail?id=${item.orderId}" class="order-detail-link">주문 상세보기</a>
    </div>
  </div>
  `
}



// 상품 존재하지 않을때
function makeNoItemContainerHTML() {
  return '<div class="no-item-container">상품이 존재하지 않습니다.</div>';
}



// 상품 박스 내 '주문 상태' HTML
function stateComponent(state) {
  if (state === PREPARE) {
    return `
      <div class="order-state-text">${PREPARE}</div>
      <a class="order-state-link">주문취소</a>
    `
  }

  else if (state === DELIVER) {
    return `<div class="order-state-text">${DELIVER}</div>`
  }

  else if(state === COMPLETE) {
    return `
      <div class="order-state-text">${COMPLETE}</div>
      <a class="order-state-link">후기작성</a>
    `
  }
}



function setStateLinkText(orderItems) {
  let [ prepare, deliver, complete ] = [ 0, 0, 0 ];
  
  orderItems.forEach((item) => {
    if (item.state === PREPARE) prepare++;
    if (item.state === DELIVER) deliver++;
    if (item.state === COMPLETE) complete++;
  })

  productPrepareLink.textContent = `${PREPARE}(${prepare})`; 
  productDeliveryLink.textContent = `${DELIVER}(${deliver})`;
  deliveryCompleteLink.textContent = `${COMPLETE}(${complete})`;
}



// 응답 json 데이터 전처리
function getOrderItems(orders) {
  const orderItems = [];
  
  orders.forEach((order) => {
    const sharedAttributes = {
      orderId: order._id,
      state: order.state,
      createdAt: getDate(order.createdAt)
    }

    order.products.forEach((item) => {
      const pushItem = {
        ...sharedAttributes,
        size: item.option.size,
        color: item.option.color,
        quantity: item.quantity,
        priceSum: item.quantity * item.product[0].price,
        imagePath: item.product[0].imagePath[0],
        productName: item.product[0].productName,
        productId: item.product[0]._id
      }
      orderItems.push(pushItem);
    })
  })

  return orderItems;
}



// 날짜 전처리
function getDate(date) {
  return date.split('T')[0];
}