import * as Api from '/api.js';

const imgs = {};
const colors = new Set();
let imagePaths = [];

function addHeaderEvents(component) {
  const dropdownTrigger = component.querySelector('.dropdown-trigger');
  const dropdownMenu = component.querySelector('.dropdown-menu');
  const logoutButton = component.querySelector('.logout');
  const hamburgerMenu = component.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  dropdownTrigger.addEventListener('click', () => {
    dropdownTrigger.classList.toggle('clicked');
    dropdownMenu.classList.toggle('show');
  });

  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('hashedEmail');
  });

  hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.add('open');
  });
}

function addCategoryEvents(component) {
  const closeButton = component.querySelector('.close-button');
  const sidebar = component.querySelector('.sidebar');

  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

function addProductModalEvents(component) {
  const modalLayout = component.querySelector('.modal-layout');
  const closeButton = component.querySelector('.modal-header-close');
  const fileInput = component.querySelector('.file .file-input[type=file]');
  const imgsContainer = component.querySelector('.imgs-container');
  const addColorBtn = component.querySelector('.color-button');

  // 중복제거 로직 필요...

  closeButton.addEventListener('click', () => {
    modalLayout.classList.remove('show-modal');
  });

  // 취소 버튼 클래스명 수정 필요...
  fileInput.addEventListener('change', async () => {
    if (fileInput.files.length > 0) {
      const fileNameBox = document.querySelector('.file .file-name');
      console.log(fileInput.files);

      // const formData = new FormData();
      // formData.append('images', fileInput.files[0]);

      // const res = await fetch('/image/register', {
      //   method: 'post',
      //   body: formData,
      // });
      // const imagePath = await res.json();
      // console.log(imagePath);

      // 파일 이름으로 키값 지정 시 문제 있음 -> 수정 필요.
      for (const file of fileInput.files) {
        if (file.name.split('.')[0] in imgs) {
          continue;
        }

        imgs[file.name.split('.')[0]] = file;
      }

      let template = ``;

      console.log(imgs);

      for (const fileName in imgs) {
        template += `<span style="font-size: 14px; margin: 10px 7.5px 10px 0px;" class="tag is-info">
          <span style="">${fileName}</span>
          <span class="img-cancel" style="padding: 2px 0px 2px 5px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></span>
        </span>`;
      }

      template += `<div style="display: flex; justify-content: flex-end; width: 100%;">
        <button class="upload-btn" style="cursor: pointer; border-radius: 4px; background-color: #474747; border: 0; padding: 10px; color: white;">이미지 업로드</button>
      </div>`;

      imgsContainer.innerHTML = template;

      const imgCancelBtn = imgsContainer.querySelectorAll(`.img-cancel`);
      const uploadBtn = imgsContainer.querySelector('.upload-btn');

      imgCancelBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          delete imgs[e.target.parentNode.previousElementSibling.textContent];
          e.target.parentNode.parentNode.remove();
        });
      });

      uploadBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(imgs);

        for (const fileName in imgs) {
          formData.append('images', imgs[fileName]);
        }

        const res = await fetch('/image/register', {
          method: 'post',
          body: formData,
        });

        const result = await res.json();
        imagePaths = result;
        console.log(result);

        alert('이미지 등록이 정상적으로 완료되었습니다.');
      });
    }
  });

  addColorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const colorInput = component.querySelector('.modal-input[id=product-color]');
    const colorContainer = component.querySelector('.colors-container');

    colors.add(colorInput.value);
    const colorArray = [...colors];
    let template = ``;

    for (const color of colorArray) {
      template += `<span style="font-size: 14px; margin: 10px 7.5px 10px 0px;" class="tag is-info">
          <span style="">${color}</span>
          <span class="color-cancel" style="padding: 2px 0px 2px 5px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></span>
        </span>`;
    }

    colorContainer.innerHTML = template;

    const colorCancelBtn = component.querySelectorAll(`.color-cancel`);

    colorCancelBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        colors.delete(e.target.parentNode.previousElementSibling.textContent);
        e.target.parentNode.parentNode.remove();
      });
    });

    colorInput.value = '';
  });
}

function createProductModalEvents(component) {
  addProductModalEvents(component);

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

    let size = [];

    if (sizeInputs.length > 0) {
      size = Array.from(sizeInputs).reduce((acc, curr) => {
        if (curr.checked) {
          return [...acc, curr.value];
        } else {
          return [...acc];
        }
      }, []);
    }

    const data = { productName, info, price, category, imagePath, size, color };

    const result = await Api.post('/product/register', data);
    console.log(result);

    alert('상품 등록이 정상적으로 완료되었습니다.');
    window.location.reload();
  });
}

function editProductModalEvents(component) {
  addProductModalEvents(component);
}

export function addComponentEvents(component) {
  const { id } = component;

  switch (true) {
    case id === 'header':
      addHeaderEvents(component);
      break;

    case id === 'category':
      addCategoryEvents(component);
      break;
    case id === 'add-product-modal':
      createProductModalEvents(component);
      break;
    case id === 'edit-product-modal':
      editProductModalEvents(component);
      break;
  }
}
