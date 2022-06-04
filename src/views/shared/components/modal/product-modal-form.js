import * as Api from '/api.js';

const createProductModalForm = (props) => {
  const { btnText, categories } = props;

  return /* html */ `
    <form class="modal-form">
      <ul class="modal-ul">
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-name">
            상품 이름
          </label>
          <input class="modal-input" type="text" id="product-name" />
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-info">
            상품 설명
          </label>
          <input class="modal-input" type="text" id="product-info" />
        </li>        
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-price">
            가격
          </label>
          <input class="modal-input" type="number" id="product-price" />
        </li>

        <li class="modal-li">
          <label class="modal-label" htmlFor="product-category">
            카테고리
          </label>
          <div class="select select-category-container">
            <select class="select-category">
              ${categories
                .map(({ categoryName }) => {
                  return /* html */ `
                  <option value=${categoryName}>${categoryName}</option>
                `;
                })
                .join('')}
            </select>
          </div>
        </li>  

        <li class="modal-li">
          <label class="modal-label" htmlFor="product-img">
            상품 이미지
          </label>
          <div class="file has-name is-right">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" multiple>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
              </span>
            </label>
          </div>
          <div class="img-tag-container"></div>
        </li>
      
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-size">
            가능 사이즈
          </label>
          <div class="control size-radio">
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="Free">
              Free
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="S" >
              S
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="M" >
              M
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="L" >
              L
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="XL" >
              XL
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="2XL" >
              2XL
            </label>
            <label class="radio">
              <input class="size-radio-input" type="checkbox" name="3XL" >
              3XL
            </label>                                    
          </div>
        </li>
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-color">
            색상
          </label>
          <div class="color-container">
            <input class="modal-input" type="text" id="product-color" />
            <button class="add-color-btn"><i class="fa-solid fa-circle-plus"></i></button>
          </div>
          <div class="colors-container"></div>
        </li>                                
      </ul>
      <button class="modal-button" type="submit">
        ${btnText}
      </button>
    </form>
  `;
};

const imgsHash = {};
const colors = new Set();
let imagePaths = [];

const TagsHTML = (tagName, tagType) => {
  const cancelClassName = tagType === 'img' ? 'img-cancel' : 'color-cancel';

  return /* html */ `
  <span style="font-size: 14px; margin: 10px 7.5px 10px 0px;" class="tag is-info">
    <span class=${cancelClassName} style="padding: 2px 0px 2px 2px; cursor: pointer;">${tagName}${'  '}<i data-key="${tagName}" class="fa-solid fa-xmark"></i></span>
  </span>
  `;
};

const imgUploadBtn = () => /* html */ `
  <div class="img-upload-btn-container" style="display: flex; justify-content: flex-end; width: 100%;">
    <button class="upload-btn" style="cursor: pointer; border-radius: 4px; background-color: #474747; border: 0; padding: 10px; color: white;">이미지 업로드</button>
  </div> 
  `;

function addProductModalFormListener(component) {
  onChangeImageFile(component);
  onClickAddColorBtn(component);
  onClickSubmitBtn(component);
}

function onChangeImageFile(component) {
  const fileInput = component.querySelector('.file-input[type=file]');
  const imgTagContainer = component.querySelector('.img-tag-container');

  fileInput.addEventListener('change', () => {
    const { files } = fileInput;

    if (files.length <= 0) return;

    for (const file of files) {
      const keyValue = file.name;
      if (keyValue in imgsHash) continue;

      imgsHash[keyValue] = file;
    }

    let imageTags = ``;

    for (const fileName in imgsHash) {
      imageTags += TagsHTML(fileName, 'img');
    }

    imageTags += imgUploadBtn();

    imgTagContainer.innerHTML = imageTags;

    onClickImgTagCancelBtn(imgTagContainer);
    onClickUploadBtn(imgTagContainer);
  });
}

function onClickImgTagCancelBtn(component) {
  const imgCancelBtn = component.querySelectorAll(`.img-cancel`);

  imgCancelBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      delete imgsHash[e.target.dataset.key];
      e.target.parentNode.parentNode.remove();

      if (Object.keys(imgsHash).length === 0 && imgsHash.constructor === Object) {
        const uploadBtn = component.querySelector('.img-upload-btn-container');
        uploadBtn.remove();
      }
    });
  });
}

function onClickUploadBtn(component) {
  const uploadBtn = component.querySelector('.upload-btn');

  uploadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const fileName in imgsHash) {
      formData.append('images', imgsHash[fileName]);
    }

    const res = await fetch('/image/register', {
      method: 'post',
      body: formData,
    });

    const result = await res.json();
    imagePaths = result;

    alert('이미지 등록이 정상적으로 완료되었습니다.');
  });
}

function onClickAddColorBtn(component) {
  const addColorBtn = component.querySelector('.add-color-btn');

  addColorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const colorInput = component.querySelector('.modal-input[id=product-color]');
    const colorContainer = component.querySelector('.colors-container');

    colors.add(colorInput.value);
    const colorArray = [...colors];

    let colorTags = ``;

    for (const color of colorArray) {
      colorTags += TagsHTML(color, 'color');
    }

    colorContainer.innerHTML = colorTags;

    onClickColorCancelBtn(colorContainer);

    colorInput.value = '';
  });
}

function onClickColorCancelBtn(component) {
  const colorCancelBtn = component.querySelectorAll(`.color-cancel`);

  colorCancelBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      colors.delete(e.target.dataset.key);
      e.target.parentNode.parentNode.remove();
    });
  });
}

function onClickSubmitBtn(component) {
  const submitForm = component.querySelector('.modal-form');

  submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productName = component.querySelector('.modal-input[id=product-name]').value;
    const info = component.querySelector('.modal-input[id=product-info]').value;
    const price = component.querySelector('.modal-input[id=product-price]').value;
    const category = component.querySelector('.select-category').value;
    const imagePath = imagePaths;
    const sizeInputs = component.querySelectorAll('.size-radio-input');
    const color = [...colors];

    if (!productName) {
      alert('상품 이름이 공백입니다.');
      return;
    }

    if (!info) {
      alert('상품 설명이 공백입니다.');
      return;
    }

    if (!price) {
      alert('가격이 공백입니다.');
      return;
    }

    if (imagePath.length === 0) {
      alert('이미지 등록이 정상적으로 이루어지지 않았습니다.');
      return;
    }

    let size = [];

    if (sizeInputs.length > 0) {
      size = Array.from(sizeInputs).reduce((acc, curr) => {
        if (curr.checked) {
          return [...acc, curr.name];
        } else {
          return [...acc];
        }
      }, []);
    }

    if (size.length === 0) {
      alert('사이즈를 체크해주세요');
      return;
    }

    if (color.length === 0) {
      alert('색을 추가해주세요.');
      return;
    }

    const data = { productName, info, price, category, imagePath, size, color };

    const productId = component.getAttribute('product-id');

    // form validation 필요.

    if (!!productId) {
      await Api.put(`/product/update`, `${productId}`, data);
      alert('상품 수정이 정상적으로 완료되었습니다.');
    } else {
      await Api.post('/product/register', data);
      alert('상품 등록이 정상적으로 완료되었습니다.');
    }

    window.location.reload();
  });
}

export { createProductModalForm, addProductModalFormListener };
