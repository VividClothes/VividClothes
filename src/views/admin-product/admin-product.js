// APIs
import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import header from '/header/header.js';
import category from '/category/category.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';
import productGrid from '/products/products-grid.js';
import modal from '/modal/modal.js';
import productModalForm from '/modal/product-modal-form.js';

class AdminProduct {
  constructor() {
    // Base DOM
    this.root = document.getElementById('root');
    this.main = document.getElementById('main');

    // Components
    this.header = document.getElementById('header');
    this.category = document.getElementById('category');
    this.addProductModal = document.getElementById('add-product-modal');
    this.editProductModal = document.getElementById('edit-product-modal');
    this.layout = document.getElementById('layout');
    this.titleSection = document.getElementById('title-section');
    this.productGrid = document.getElementById('products-grid');
  }

  async createDOM() {
    this.header.insertAdjacentHTML('afterbegin', header());
    this.layout.insertAdjacentHTML('afterbegin', layout());

    const categories = await Api.get('/category/list');
    this.category.insertAdjacentHTML('afterbegin', await category({ categories }));

    this.titleSection.insertAdjacentHTML(
      'afterbegin',
      titleSection({
        title: '관리자 설정',
        subTitle: '상품 관리',
        extraContent: () => this.createTitleSectionLeft(categories),
      })
    );

    this.productGrid.insertAdjacentHTML('afterbegin', await productGrid());

    this.addProductModal.insertAdjacentHTML(
      'afterbegin',
      modal({ modalForm: productModalForm, type: 'ADD', categories })
    );

    this.editProductModal.insertAdjacentHTML(
      'afterbegin',
      modal({ modalForm: productModalForm, type: 'EDIT', categories })
    );
  }

  addAllEvents() {
    addComponentEvents(this.header);
    addComponentEvents(this.category);
    addComponentEvents(this.titleSection);
    addComponentEvents(this.addProductModal);
    addComponentEvents(this.editProductModal);

    this.addSelectCategoryEvent();
    this.addCreateProductEvent();
    this.addEditProductEvent();
    this.addDeleteProductEvent();
  }

  createTitleSectionLeft(categories) {
    return /* html */ `
      <div class="select">
        <select class="select-box">
          <option value="default">전체</option>
            ${categories
              .map(({ categoryName }) => {
                return /* html */ ` 
                <option value=${categoryName}>${categoryName}</option>
              `;
              })
              .join()}
        </select>
      </div>
      <button class="add-product-btn"><i class="fa-solid fa-plus"></i></button>
    `;
  }

  addSelectCategoryEvent() {
    const selectBox = this.titleSection.querySelector('.select-box');

    selectBox.addEventListener('change', async () => {
      console.log(selectBox.value);
      this.productGrid.innerHTML = await productGrid({ selected: selectBox.value });
    });
  }

  addCreateProductEvent() {
    const createProductBtn = this.titleSection.querySelector('.add-product-btn');
    createProductBtn.addEventListener('click', () => {
      this.addProductModal.querySelector('.add-product-form').classList.add('show-modal');
    });
  }

  addEditProductEvent() {
    const editProductBtns = this.productGrid.querySelectorAll('.edit-product-btn');

    editProductBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const { _id, productName, category, price, imagePath, info, option } = await Api.get(
          `/product/${btn.dataset.id}`
        );
        const editModalForm = this.editProductModal.querySelector('.edit-product-form');
        this.editProductModal.setAttribute('product-id', _id.toString());

        editModalForm.querySelector('.modal-input[id=product-name]').value = productName;
        editModalForm.querySelector('.modal-input[id=product-info]').value = info;
        editModalForm.querySelector('.modal-input[id=product-price]').value = price;
        if (category) {
          editModalForm.querySelector('.select-category').value = category.categoryName;
        }

        const sizeInputs = editModalForm.querySelectorAll('.size-radio-input');
        Array.from(sizeInputs).forEach((sizeInput) => {
          if (option.size.includes(sizeInput.name)) {
            sizeInput.checked = true;
          } else {
            sizeInput.checked = false;
          }
        });

        editModalForm.classList.add('show-modal');
      });
    });
  }

  addDeleteProductEvent() {
    const deleteProductBtns = this.productGrid.querySelectorAll('.delete-product-btn');

    deleteProductBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (confirm('해당 상품을 정말 삭제하시겠습니까?')) {
          console.log(btn.dataset.id);
          await Api.delete(`/product/delete/${btn.dataset.id}`);
          window.location.reload();
        }
      });
    });
  }

  async render() {
    await this.createDOM();
    this.addAllEvents();
  }
}

window.onload = () => {
  const adminProduct = new AdminProduct();
  adminProduct.render();
};

// function createOptions() {}

// const categoryName = document.querySelector('.category-name');
// const productGrid = document.querySelector('.main-content');
// const categoryHash = {};

// createCategoryHash().then(() => {
//   const options = Object.keys(categoryHash)
//     .map((category) => {
//       return `
//       <option value=${category}>${category}</option>
//     `;
//     })
//     .join('');

//   categoryName.innerHTML = `
//   <div class="flex-div">
//     <h2 class="title-2 is-2">
//       관리자 설정 / <span class="is-italic is-capitalized is-size-4 ">상품 관리</span>
//     </h2>
//     <div class="left-side">
//     <div class="select">
//       <select id="select-box">
//         <option value="default">전체</option>
//         ${options}
//       </select>
//     </div>
//       <button id="add-product" class="button-add"><i class="fa-solid fa-plus"></i></button>
//     </div>
//   </div>
//   <hr>
// `;
//   Api.get(`/product/list`).then((products) => {
//     createProductsList(products);
//     const selectBox = document.querySelector('#select-box');
//     // const addProductButton = document.getElementById('add-product');
//     // const editProductButtons = document.querySelectorAll('.edit-product');
//     // const customModal = document.querySelector('uc-modal');

//     selectBox.addEventListener('change', getSelected);

//     // addProductButton.addEventListener('click', () => {
//     //   customModal.setAttribute('type', 'ADD_PRODUCT_MODAL');
//     //   customModal.setAttribute('is-open', true);
//     // });

//     // editProductButtons.forEach((btn) => {
//     //   btn.addEventListener('click', () => {
//     //     customModal.setAttribute('type', 'EDIT_PRODUCT_MODAL');
//     //     customModal.setAttribute('is-open', true);
//     //   });
//     // });
//   });
// });

// // 요소(element), input 혹은 상수

// addAllElements();
// addAllEvents();

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {
//   insertHeader();
// }

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// function addAllEvents() {}

// function insertHeader() {
//   document.body.insertAdjacentElement('afterbegin', header);
// }

// // 카테고리 요청 중복(이미 카테고리 컴포넌트에서 요청하였음) -> 그냥 id 값으로 페이지 전환해도 될듯.. 해당 funtion 필요없음
// async function createCategoryHash() {
//   const categories = await Api.get('/category/list');
//   categories.forEach(({ _id, categoryName }) => {
//     categoryHash[categoryName] = _id;
//   });
// }

// function createProductsList(products) {
//   const insertedEl = products
//     .map(({ _id, productName, category, price, imagePath, info, option }) => {
//       return `
//       <li class="col">
//         <a class="a-link" href=/product?id=${_id}>
//           <div class="card">
//             <div class="card-image">
//               <div class="img-container">
//                 <img class="grid-img" src=${imagePath[0]} alt=${productName} />
//               </div>
//             </div>
//           </a>

//             <div>
//               <div class="medias">
//                 <div class="media-content">
//                   <a class="a-link" href=/product?id=${_id}><p class="title font-16">${productName}</p></a>
//                 </div>
//               </div>

//               <div class="contents">
//                 <p class="font-15">${info}</p>
//                 <div class="button-container">
//                   <button class="edit-product buttonss has-background-info-dark">수정</button>
//                   <button class="delete-product buttonss has-background-danger">삭제</button>
//                 </div>
//                 <p class="subtitle"><i class="fa-solid fa-won-sign"></i> ${price.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>

//       </li>`;
//     })
//     .join('');
//   console.log(products);

//   productGrid.innerHTML = `<ul class="grid">${insertedEl}</ul>`;
// }

// async function getSelected() {
//   console.log(this.value);
//   const products =
//     this.value !== 'default'
//       ? await Api.get(`/product/category/${categoryHash[this.value]}`)
//       : await Api.get(`/product/list`);

//   createProductsList(products);
// }
