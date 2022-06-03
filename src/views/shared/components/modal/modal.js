import modalStlye from '/modal/modal-style.js';
import { addProducttModalData, editProductModalData } from '/modal/product-modal-data.js';
import { confirmPasswordModalData } from '/modal/password-modal-data.js';

import { createProductModalForm, addProductModalFormListener } from '/modal/product-modal-form.js';
import { createConfirmModalForm, addConfirmModalFormListener } from '/modal/password-modal-form.js';

let modalFormListener = null;

const createModal = (props) => {
  const { type, modalTitle, btnText } = props.data;
  let modalForm = null;

  if (type === addProducttModalData.type || type === editProductModalData.type) {
    modalForm = createProductModalForm({ btnText, categories: props.apiData });
    modalFormListener = addProductModalFormListener;
  }

  if (type === confirmPasswordModalData.type) {
    modalForm = createConfirmModalForm({ btnText });
    modalFormListener = addConfirmModalFormListener;
  }

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
      ${modalForm}
      <footer></footer>
    </div>
  `;
};

function addModalListener(component) {
  onClickCloseBtn(component);
  modalFormListener(component);
}

function onClickCloseBtn(component) {
  const modalLayout = component.querySelector('.modal-layout');
  const closeBtn = component.querySelector('.modal-header-close');

  closeBtn.addEventListener('click', () => {
    modalLayout.classList.remove('show-modal');
  });
}

export { createModal, addModalListener };
