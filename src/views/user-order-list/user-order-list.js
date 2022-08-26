import { addCommas, convertToNumber } from '/useful-functions.js';
import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener} from '/category/category.js';


/****************************요소 모음**********************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
const itemsBody = document.querySelector('.items-body');
const productPrepareLink = document.querySelector('.product-prepare-link');
const productDeliveryLink = document.querySelector('.product-delivery-link');
const deliveryCompleteLink = document.querySelector('.delivery-complete-link');
const modal = document.querySelector('.modal');
const modalBackground = document.querySelector('.modal-background');
const exitButton = document.querySelector('.exit-button');
const starInput = document.querySelector('.star-input');
const starSpan = document.querySelector('.star span');
const contentValue = document.querySelector('.content-value');
const inputFile = document.querySelector('.input-file');
const modalImages = document.querySelector('.modal-images');
const registerButton = document.querySelector('.review-register-button');
const PREPARE = '상품 준비중';
const DELIVER = '상품 배송중';
const COMPLETE = '배송 완료';
let rate = -1;
let orderProductId = 0;
let orderId = 0;
/*********************************************************************/

/****************************모달**********************************/
const open = (e, item) => {
  modal.classList.remove("hidden");
  orderProductId = item.orderProductId;
  orderId = item.orderId; 
  starSpan.style.width = '100%';
}
const close = () => {
  modal.classList.add("hidden");
  refreshModalContents();
}
modalBackground.addEventListener("click", close);
exitButton.addEventListener("click", close);
/*********************************************************************/


/***************************헤더*************************************/
(async() => {
  const [categories, orders] = await Promise.all([
    Api.get('/category/list'),
    Api.get(`/order/mylist`)
  ]);

  nav.insertAdjacentElement('afterbegin', header);
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);

  // 데이터 불러오기
  let orderItems = getOrderItems(orders.datas);
  const urlParams = new URLSearchParams(window.location.search);
  const listType = urlParams.get('type');
  
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
  if(orderItems.length === 0) {
    itemsBody.insertAdjacentHTML('beforeend', makeNoItemContainerHTML());
  } 
  /***********************************************************************/



  /********************주문내역 하나라도 있을때 렌더링***********************/
  else {
    orderItems.forEach((item) => {
      itemsBody.insertAdjacentHTML('beforeend', makeItemContainerHTML(item));
    })


    // 취소 및 후기 링크 이벤트 추가
    const stateBoxes = itemsBody.getElementsByClassName('order-state-box');
    orderItems.forEach((item, index) => {

      // 1. 상품 준비중 - 취소링크
      if (item.state ===  PREPARE) {
        const cancelLink = stateBoxes[index].querySelector('.order-state-link');
        cancelLink.addEventListener('click', async (e) => {
          e.preventDefault();
          const realCancel = confirm('상품 주문을 취소하시겠습니까?');

          if(realCancel) {
            await Api.patch(`/order/${item.orderId}/product/${item.orderProductId}/cancel`);
            alert('상품 주문이 취소되었습니다.');
            window.location.reload();
          }
        })
      }

      // 2. 배송 완료 - 후기 링크
      else if(item.state === COMPLETE) {
        const reviewLink = stateBoxes[index].querySelector('.order-state-link'); 
        
        if(item.hasReview) {
          reviewLink.textContent = '후기 작성완료';
          reviewLink.style.textDecoration = 'none';
          reviewLink.style.color = '#bbb';
        }
        else {
          reviewLink.addEventListener('click', (e) => open(e, item));
        }
      }
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
      <div class="price">${addCommas(item.priceSum)} 원</div>
      <div class="quantity">${item.quantity}</div>
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
      createdAt: order.createdAt.split('T')[0]
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
        productId: item.product[0]._id,
        hasReview: item.hasReview,
        orderProductId: item._id
      }
      orderItems.push(pushItem);
    })
  })

  return orderItems;
}



/*****************************모달******************************/
function refreshModalContents() {
  contentValue.value = ''; // 글 내용 지우기
  inputFile.value = ''; // 이미지 지우기
  modalImages.innerHTML = '';// 이미지 테그 지우기
}



registerButton.addEventListener('click', async (e) => {

  if (rate === -1) {
    alert('별점을 남겨주세요.');
  }
  
  else if (!contentValue.value) {
    alert('리뷰 내용을 입력해주세요');
  }

  else {
  
    const formData = new FormData();
    
    for (const file of inputFile.files) {
      formData.append("images", file);
    }

    const res = await fetch('/image/register', {
      method: 'post',
      body: formData,
    });

    const imagePath = await res.json();
    
    const reqBody = {
      orderProductId,
      content: contentValue.value,
      rate,
      imagePath
    }

    await Api.post(`/review/register/${orderId}`, reqBody);
    
    alert('리뷰 등록이 완료되었습니다.');
    window.location.reload();
  }
  
})


inputFile.addEventListener('change', (event) => {
  for (const image of event.target.files) {
    let reader = new FileReader();

    reader.onload = (e) => {
      let img = document.createElement('img');
      img.setAttribute('src', e.target.result);
      modalImages.appendChild(img);
      modalImages.lastElementChild.classList.add('modal-image-unit');
    }
    reader.readAsDataURL(image);
  }
})


/*********************별점 관련 이벤트********************/
starInput.addEventListener('input', (e) => {
  starSpan.style.width = `${e.target.value * 10}%`;
  rate = e.target.value;
})
/********************************************************/