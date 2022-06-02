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
const orderDate = document.querySelector('.order-date');
const recipient = document.querySelector('.recipient');
const phoneNumber = document.querySelector('.phone');
const address = document.querySelector('.address');
const itemsBody = document.querySelector('.items-body');
const paymentPrice = document.querySelector('.payment-price');
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
let reviewProductId = 0;
/*********************************************************************/



/****************************모달**********************************/
const open = (e, index, orderItems) => {
  modal.classList.remove("hidden");
  reviewProductId = orderItems[index].productId;
}
const close = () => {
  modal.classList.add("hidden");
  refreshModalContents();
}
modalBackground.addEventListener("click", close);
exitButton.addEventListener("click", close);
/*********************************************************************/



(async () => {
    
    /*****************************쿼리스트링 값 추출*************************/
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    /**********************************************************************/

    const ordersInfo = await Api.get(`/order/${orderId}`);
    const orderItems = getProducts(ordersInfo);
    const orderState = ordersInfo.state;
    console.log(orderItems)

    // 수령인 정보 설정
    setRecipientInfo(ordersInfo);
    


    // 구매 상품 리스트 삽입
    orderItems.forEach((item) => {
        itemsBody.insertAdjacentHTML('beforeend', makeItemHTML(item, orderState));
      })

      

    // 최종 결제 금액 표시
    setPaymentPrice(orderItems);



    // 취소 및 후기 링크 이벤트 추가
    const stateBoxes = itemsBody.getElementsByClassName('order-state-box');
    orderItems.forEach((item, index) => {

      // 1. 상품 준비중 - 취소링크
      if (orderState ===  PREPARE) {
        const cancelLink = stateBoxes[index].querySelector('.order-state-link');
        cancelLink.addEventListener('click', async (e) => {
          e.preventDefault();
          const realCancel = confirm('상품 주문을 취소하시겠습니까?');

          if(realCancel) {
            await Api.patch(`/order/${orderId}/product/${item.productId}/cancel`);
            alert('상품 주문이 취소되었습니다.');

            if (orderItems.length === 1) {
              window.location.href = '/user-order-list';
            }
            else {
              window.location.reload();
            }
          }
        })
      }

      // 2. 배송 완료 - 후기 링크
      else if(orderState === COMPLETE) {
        const reviewLink = stateBoxes[index].querySelector('.order-state-link'); 
        //console.log(item)
        if (item.hasReview) {
          reviewLink.textContent = '후기 작성완료';
          reviewLink.style.textDecoration = 'none';
          reviewLink.style.color = '#bbb';
        }
        else {
          reviewLink.addEventListener('click', (e) => open(e, index, orderItems));
        }
      }
    })
})()


// 수령인 정보 설정 함수
function setRecipientInfo(ordersInfo) {
    const orderDateText = getDate(ordersInfo.createdAt);
    const recipientText = ordersInfo.recipient;
    const phoneNumberText = ordersInfo.phoneNumber;
    const addressText = getAddress(ordersInfo.address);

    orderDate.textContent = orderDateText;
    recipient.textContent = recipientText;
    phoneNumber.textContent = phoneNumberText;
    address.textContent = addressText;
}


// 날짜 전처리
function getDate(orderDate) {
    let [ date, time ] = orderDate.split('T');
    date = date.replaceAll('-', '.');
    time = time.split('.')[0]
    return `${date} ${time}`;
}


// 주소 전처리
function getAddress(address) {
    const { postalCode, address1, address2 } = address;
    return `(${postalCode}) ${address1} ${address2}`;
}


// 응답 데이터로 구매 상품 데이터s 전처리
function getProducts(ordersInfo) {
    const items = [];
    
    ordersInfo.products.forEach((order) => {
        const item = {
            productName: order.product[0].productName,
            imagePath: order.product[0].imagePath[0],
            size: order.option.size,
            color: order.option.color,
            quantity: order.quantity,
            priceSum: order.quantity * order.product[0].price,
            productId: order.product[0]._id,
            hasReview: order.hasReview
        };

        items.push(item);
    })

    return items;
}


// 구매 상품 HTML 생성 함수
function makeItemHTML(item, orderState) {
    return `
    <div class="item-container">
        <div class="product-name-options">
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
        <div class="product-quantity">${item.quantity}</div>
        <div class="total-price">${addCommas(item.priceSum)}</div>
        <div class="order-state-box">
            ${stateComponent(orderState)}
        </div>
    </div>
    `
}


// 상품 박스 내 '주문 상태' HTML
function stateComponent(state) {
  if (state === PREPARE) {
    return `
        <div class="order-state-text">${PREPARE}</div>
        <a class="order-state-link" id="cancel-link">주문취소</a>
      `
  }

  else if (state === DELIVER) {
    return `<div class="order-state-text">${DELIVER}</div>`
  }

  else if (state === COMPLETE) {
    return `
        <div class="order-state-text">${COMPLETE}</div>
        <a class="order-state-link">후기작성</a>
      `
  }
}



function setPaymentPrice(items) {
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.priceSum;
    }, 0);

    paymentPrice.textContent = `${addCommas(totalPrice)}원`;
}


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
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

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
      productId: reviewProductId,
      content: contentValue.value,
      rate,
      imagePath
    }

    console.log(reqBody);
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