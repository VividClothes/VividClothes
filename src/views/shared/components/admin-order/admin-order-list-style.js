const adminOrderListStyle = /* html */ `
  <style>

main {
  font-size: 12px;
  margin: 0 auto;
  overflow: hidden;
  padding: 1rem 0;
}

.basket {
  width: 100%;
}

.basket-module {
  color: #111;
}

.basket label {
  display: block;
  margin-bottom: 0.3125rem;
}

.basket-labels {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.order-table {
  list-style: none;
  margin: 0;
  padding: 0;
}

.order-table li {
  display: inline-block;
  padding: 6.25px 0;
}

.order-table li {
  display: inline-flex;
  justify-content: center;
}

.order-number {
  width: 20%;
}
.order-product {
  width: 30%;
}

.order-price {
  width: 10%;
}

.order-quantity {
  width: 10%;
  margin-left: 9px;
}

.order-state {
  width: 15%;
  margin-left: 7px;
}

.order-total {
  width: 10%;
  margin-left: 7px;
}

.order-content {
  display: flex;
}

.order-center {
  display: flex;
  flex-direction: column;
  width: 55%;
}

.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-side-content {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.order-info {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.order-product-info {
  display: flex;
  width: 58%;
}

.order-price-info {
  display: flex;
  justify-content: center;
  width: 20%;
}

.order-quantity-info {
  display: flex; 
  justify-content: center;
  width: 22%;
}

.order-state-info {
  width: 15%;
}

.order-total-info {
  width: 13%;
}

.order-image-container {
  min-width: 100px;
  height: 100px;
  padding: 10px;
}

.order-image-container img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.order-product-name-container {
  display: flex;
  align-items: center;
  width: 100%;
}

  </style>
`;

export default adminOrderListStyle;
