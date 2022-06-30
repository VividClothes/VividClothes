import * as Api from '/api.js';

import adminOrderListStyle from '/admin-order/admin-order-list-style.js';

const createAdminOrderList = (orders) => /* html */ `
  ${adminOrderListStyle}
  <main>
    <div class="basket">
    ${orders
      .map((order) => /* html */ {
        const { _id, orderer, createdAt } = order;
        const date = new Date(createdAt);

        const convertedDate = `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`;

        return /* html */ `
        <div class="order-content">
          <div class="order-title">
            <span class="orderer">주문내역</span>
            <span class="orderer-id">${orderer ? orderer.email : ''}</span>
            <span class="order-number">${_id}</span>
          </div>
          <div class="order-btns">
            <div class="order-state-info"> ${createOrderState(order.state, _id)}</div>
          </div>
          <div class="order-center">
    
          <ul class="order-table">
            <li class="order-product">상품</li>
            <li class="order-price">가격</li>
            <li class="order-quantity">수량</li>
          </ul>
          <hr>
          ${order.products
            .map(
              (product) => /* html */ `
  
            ${product.product
              .map(
                ({ _id, imagePath, productName, price }) => /* html */ `
                <div class="order-info">
                  <div class="order-product-info">
                    <div class="order-image-container">
                      <a href="/product/?id=${_id}">
                        <img src="${imagePath[0]}" alt="${productName}" />
                      </a>
                    </div>
  
                  <div class="order-product-name-container flex-box">
                    <a href="/product/?id=${_id}">
                      <span class="order-name">${productName}</span>
                    </a>
                  </diV>
                </div>
              <div class="order-price-info flex-box"><span class="order-name">${price.toLocaleString()}</span></div>
              <div class="order-quantity-info flex-box"><span class="order-name">${
                product.quantity
              }</span></div>
            </div>
          `
              )
              .join('')}
        `
            )
            .join('')}
      
      </div>
      <div class="order-side-content-container">
        <div class="order-side-content flex-box">
          <span>📅 ${convertedDate}</span>
          <div class="order-total-info order-side-content flex-box">총 금액: ${order.priceTotal.toLocaleString()}원</div>
          <button data-orderid="${_id}" class="order-cancel-btn">주문취소</button> 
        </div>
      </div>

      </div>`;
      })
      .join('')}
    
  </main>  
`;

function addAdminOrderListener(component) {
  onClickCancelBtn(component);
  addSelectCategoryEvent(component);
}

function createOrderState(orderState, orderId) {
  const optionValues = ['상품 준비중', '상품 배송중', '배송 완료'];
  const filtered = optionValues.filter((op) => op !== orderState);
  return /* html */ `
      <div class="select">
        <select data-orderid="${orderId}" class="select-box">
          <option value="none" selected disabled hidden>${orderState}</option>
          ${filtered
            .map(
              (option) => /* html */ `
            <option value="${option}">${option}</option>
          `
            )
            .join('')}
        </select>
      </div>
    `;
}

function onClickCancelBtn(component) {
  const cancelBtn = component.querySelectorAll('.order-cancel-btn');

  Array.from(cancelBtn).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const orderId = e.target.dataset.orderid;
      await Api.delete(`/order/cancel`, `${orderId}`);
      window.location.reload();
    });
  });
}

async function addSelectCategoryEvent(component) {
  const selectBox = component.querySelectorAll('.select-box');

  Array.from(selectBox).forEach((select) => {
    select.addEventListener('change', async (e) => {
      const orderId = e.target.dataset.orderid;
      console.log(e.target);
      let data = 0;

      switch (e.target.value) {
        case '상품 준비중':
          data = 0;
          break;
        case '상품 배송중':
          data = 1;
          break;
        case '배송 완료':
          data = 2;
          break;
      }

      await Api.patch('/order/update', `${orderId}`, { stateCode: data });
      window.location.reload();
    });
  });
}

export { createAdminOrderList, addAdminOrderListener };
