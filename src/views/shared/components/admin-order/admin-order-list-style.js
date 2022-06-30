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
  display: flex;
}

.order-table li {
  display: inline-block;
  padding: 6.25px 0;
}

.order-table li {
  display: inline-flex;
  justify-content: center;
}

.order-center > hr {
  margin: 0;
}

.order-product {
  width: 58%;
}

.order-price {
  width: 20%;
}

.order-quantity {
  width: 22%;
}

.order-state {
  margin-left: 7px;
}

.order-total {
  margin-left: 7px;
}

.order-content {
  display: flex;
  flex-direction: column;
  margin: 4px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 20px;
}

.order-content > .order-title {
  display: flex;
  flex-direction: column;
}

.order-content > .order-btns {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.order-cancel-btn {
  padding: 6px 18px;
  font-size: 15px;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: rgb(49, 49, 49);
}

.order-cancel-btn:hover {
  background-color: rgb(64, 64, 64);
}

.order-center {
  display: flex;
  flex-direction: column;
}

.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-name {
  font-size: 12px;
}

.order-side-content-container {
  display: flex;
  height: 100%;
  justify-content: center;
}

.order-side-content {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 5px;
}

.order-info {
  display: flex;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  margin-bottom: 10px;
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

.orderer {
  font-size: 17px;
  font-weight: bold;
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

@media screen and (min-width: 550px) {
  .order-name {
    font-size: 15px;
  }
}

@media screen and (min-width: 1024px) {
  .basket {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 35px;
    column-gap: 35px;
  }
  .order-name {
    font-size: 15px;
  }
}

  </style>
`;

export default adminOrderListStyle;
