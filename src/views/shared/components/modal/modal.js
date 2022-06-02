import modalStlye from '/modal/modal-style.js';
import { createProductModalForm, addProductModalFormListener } from '/modal/product-modal-from.js';

const createModal = (props) => {
  const { modalTitle, btnText } = props.data;

  return /* html */ `
    ${modalStlye}
    <div class="modal-layout">
      <header class="modal-header">
        <button class="modal-header-close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 class="modal-title">
          ${modalTitle}
        </h3>
      </header>
      ${createProductModalForm({ btnText, categories: props.apiData })}
      <footer></footer>
    </div>
  `;
};

function addModalListener(component) {
  onClickCloseBtn(component);
  addProductModalFormListener(component);
}

function onClickCloseBtn(component) {
  const modalLayout = component.querySelector('.modal-layout');
  const closeBtn = component.querySelector('.modal-header-close');

  closeBtn.addEventListener('click', () => {
    modalLayout.classList.remove('show-modal');
  });
}

export { createModal, addModalListener };
