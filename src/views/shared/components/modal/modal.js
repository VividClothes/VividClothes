import modalStlye from '/modal/modal-style.js';

const modal = (props) => {
  const { modalForm, type } = props;
  let modalClassName = '';
  let modalTitle = '';
  let btnText = '';

  if (type === 'ADD') {
    modalClassName = 'add-product-form';
    modalTitle = '상품 등록 👔';
    btnText = '등록하기';
  }

  if (type === 'EDIT') {
    modalClassName = 'edit-product-form';
    modalTitle = '상품 수정 👗';
    btnText = '수정하기';
  }

  return /* html */ `
    ${modalStlye}
    <div class="modal-layout ${modalClassName}">
      <header class="modal-header">
        <button class="modal-header-close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 class="modal-title">
          ${modalTitle}
        </h3>
      </header>
        ${modalForm({ btnText })}
      <footer></footer>
    </div>
  `;
};

export default modal;
