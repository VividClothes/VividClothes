import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';

/***************************헤더 내용**********************************/
// 요소(element), input 혹은 상수
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  document.body.insertAdjacentElement('afterbegin', header);

  const categories = await Api.get('/category/list');
  document.body.insertAdjacentHTML('afterbegin', await createCategory({ categories }));

  addHeaderEventListener();
  addCategoryListener(document.body);
}

/********************필요한 요소들 모음*******************************/
const wrapItemsHelper = document.querySelector('.wrap-items-helper');
const addBox = document.querySelector('.add-box');
/*******************************************************************/

run();

async function run() {
  const itemBoxes = document.getElementsByClassName('item-box');
  const deleteButtons = document.getElementsByClassName('btn-delete');
  const updateButtons = document.getElementsByClassName('btn-update');

  // 카테고리 리스트 받아오기
  const categories = await Api.get('/category/list');

  // 받아온 결과 HTML로 만들어서 wrapItemsHelper에 추가. 카테고리 리스트에 값 복사
  categories.forEach((category) => {
    wrapItemsHelper.insertAdjacentHTML('beforeend', makeCategoryBoxHTML(category.categoryName));
  });

  /***************아이템 박스 이벤트 (카테고리 박스)********************/
  Array.from(itemBoxes).forEach((itemBox) => {
    itemBox.addEventListener('mouseover', (e) => {
      e.currentTarget.style.borderColor = '#666';
    });

    itemBox.addEventListener('mouseout', (e) => {
      e.currentTarget.style.borderColor = '#aaa';
    });
  });
  /*******************************************************************/

  /*********************박스내 삭제 버튼**************************/
  Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteButtonCallBack);
  });
  /*******************************************************************/

  /*********************박스내 수정 버튼**************************/
  Array.from(updateButtons).forEach((updateButton) => {
    updateButton.addEventListener('click', updateButtonCallBack);
  });
  /*******************************************************************/

  /************************addBox***************************/
  addBox.addEventListener('mouseover', (e) => {
    e.currentTarget.style.borderColor = '#666';
  });
  addBox.addEventListener('mouseout', (e) => {
    e.currentTarget.style.borderColor = '#aaa';
  });

  // addBox 클릭 - prompt로 입력 받음 - 등록 요청후 item-box 추가
  addBox.addEventListener('click', addBoxCallBack);
  /*******************************************************************/

  /********************이벤트리스너 콜벡함수들**********************/
  // 1. 삭제 버튼 이벤트리스너 콜백함수
  async function deleteButtonCallBack(e) {
    e.preventDefault();
    e.stopPropagation();

    const isDelete = confirm('정말 삭제 하시겠습니까?');

    if (isDelete) {
      const textNode = e.target.closest('li').childNodes[2];
      const text = textNode.textContent;

      // categories에서 id 찾기
      const index = categories.findIndex((category) => category.categoryName === text);
      const elem = categories[index];

      // 삭제 요청 보내기
      await Api.delete('/category/delete', elem._id);

      // 뷰에서 박스 제거
      e.target.closest('li').remove();
    }
  }

  // 2. 수정 버튼 이벤트리스너 콜벡함수
  async function updateButtonCallBack(e) {
    e.preventDefault();
    e.stopPropagation();

    const updateCategory = prompt('변경할 카테고리명을 입력해주세요.');
    if (!updateCategory.trim()) {
      alert('값을 입력해주세요');
      return;
    }

    // 중복된 카테고리명이 있는지 확인
    if (!categories.some((category) => category.categoryName === updateCategory)) {
      if (updateCategory) {
        const textNode = e.target.closest('li').childNodes[2];
        const text = textNode.textContent;

        // categories에서 id 찾기
        const index = categories.findIndex((category) => category.categoryName === text);
        const elem = categories[index];

        // 수정 요청 보내기
        await Api.put('/category/update', elem._id, { categoryName: updateCategory });

        // 뷰에서 텍스트 바꾸기
        textNode.textContent = updateCategory;

        // 리스트 내용도 바꾸기
        categories[index].categoryName = updateCategory;
      }
    } else {
      alert('중복된 이름이 있습니다.');
    }
  }

  // 3. addBox 이벤트리스너 콜벡함수
  async function addBoxCallBack(e) {
    e.preventDefault();
    const newCategoryName = prompt('등록할 카테고리명을 입력해주세요.');
    if (!newCategoryName.trim()) {
      alert('값을 입력해주세요');
      return;
    }

    // 중복된 이름 있는지 확인
    if (!categories.some((category) => category.categoryName === newCategoryName)) {
      try {
        const result = await Api.post('/category/register/', { categoryName: newCategoryName });
        categories.push(result);
        wrapItemsHelper.insertAdjacentHTML('beforeend', makeCategoryBoxHTML(newCategoryName));
        const itemBox = itemBoxes[itemBoxes.length - 1];

        // 추가된 박스 이벤트 추가
        itemBox.addEventListener('mouseover', (e) => {
          e.currentTarget.style.borderColor = '#666';
        });

        itemBox.addEventListener('mouseout', (e) => {
          e.currentTarget.style.borderColor = '#aaa';
        });

        const updateButton = itemBox.childNodes[4].childNodes[1];
        const deleteButton = itemBox.childNodes[4].childNodes[3];
        updateButton.addEventListener('click', updateButtonCallBack);
        deleteButton.addEventListener('click', deleteButtonCallBack);
      } catch (e) {
        alert('에러가 발생했습니다.');
      }
    } else {
      alert('중복된 이름이 있습니다.');
    }
  }
  /*******************************************************************/
}

// 새로운 카테고리 박스 HTML 생성 함수
function makeCategoryBoxHTML(newCategoryName) {
  return `
  <li class="item-box">
    <i id="three-bar" class="fa fa-bars"></i><span class="category">${newCategoryName}</span>
    <div class="info-btn">
      <a href="#" class="btn btn-update">수정</a>
      <a href="#" class="btn btn-delete">삭제</a>
    </div>
  </li>
  `;
}
