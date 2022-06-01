import adminOrderListStyle from '/admin-order/admin-order-list-style.js';

const createAdminOrderList = (orders) => /* html */ `
  ${adminOrderListStyle}
  <main>
    <div class="basket">
      <div class="basket-labels">
        <ul class="order-table">
          <li class="order-number">주문정보</li>
          <li class="order-product">상품</li>
          <li class="order-price">가격</li>
          <li class="order-quantity">수량</li>
          <li class="order-state">배송상태</li>
          <li class="order-total">총 가격</li>
        </ul>
      </div>
    ${orders
      .map((order) => /* html */ {
        const { _id, orderer, createdAt } = order;
        const date = new Date(createdAt);

        const convertedDate = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;

        return /* html */ `
        <div class="order-content">
          <div class="order-number order-side-content flex-box">
            <span>${_id}</span>
            <span>${orderer.email}</span>
            <span>${convertedDate}</span>
        </div>
        <div class="order-center">
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
                    <span>${productName}</span>
                  </a>
                </diV>
              </div>
              
              <div class="order-price-info flex-box"><span>${price.toLocaleString()}</span></div>
              <div class="order-quantity-info flex-box"><span>${product.quantity}</span></div>
              <div class="order-state-info flex-box">${order.state}</div>
            </div>
          `
            )
            .join('')}
        `
          )
          .join('')}
      
      </div> 
      <div class="order-total order-side-content flex-box">${order.priceTotal.toLocaleString()}원</div>
      </div>`;
      })
      .join('')}
    
  </main>  
`;

export { createAdminOrderList };

// <div class="order-content">
//   <div class="order-number order-side-content">sadasd</div>
//   <div class="order-center">
//     <div class="order-info">
//       <div class="order-product-info">
//         <div>상품 이미지</div>
//         <div>상품 설명</div>
//       </div>
//       <div class="order-price-info">가격</div>
//       <div class="order-quantity-info">수량</div>
//       <div class="order-state-info">배송상태</div>
//     </div>
//     <div class="order-info">
//       <div class="order-product-info">
//         <div>상품 이미지</div>
//         <div>상품 설명</div>
//       </div>
//       <div class="order-price-info">가격</div>
//       <div class="order-quantity-info">수량</div>
//       <div class="order-state-info">배송상태</div>
//     </div>
//   </div>
//   <div class="order-total order-side-content">asdsad</div>
// </div>;
