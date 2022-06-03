import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import { createPaginationBar, addPaginationBarListener } from '/pagination/pagination-bar.js';

/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async () => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/

/*****************************요소모음*******************************/
const reviewBody = document.querySelector('.review-container-helper');
const modal = document.querySelector('.modal');
const modalBackground = document.querySelector('.modal-background');
const exitButton = document.querySelector('.exit-button');
const starInput = document.querySelector('.star-input');
const starSpan = document.querySelector('.star span');
const contentValue = document.querySelector('.content-value');
const inputFile = document.querySelector('.input-file');
const modalImages = document.querySelector('.modal-images');
const registerButton = document.querySelector('.review-register-button');
const pagination = document.getElementById('pagination');
let reviewId = 0;
/*********************************************************************/

/****************************모달**********************************/
const open = (e, review) => {
  modal.classList.remove('hidden');
  contentValue.value = review.content;
  starSpan.style.width = `${10 * review.rate}%`;
  reviewId = review._id;
};
const close = () => {
  modal.classList.add('hidden');
  refreshModalContents();
};
modalBackground.addEventListener('click', close);
exitButton.addEventListener('click', close);
/*********************************************************************/

(async () => {
  /**** 페이지 네이션 ****/
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const perPage = 10;

  const results = await Api.get('/review', `list?page=${page}&perPage=${perPage}`);
  const reviews = results.datas;

  const pageData = {
    page: results.page,
    perPage: results.perPage,
    totalPage: results.totalPage,
    pageUrl: (page) => `/user-review-list?page=${page}`,
  };

  pagination.insertAdjacentHTML('afterbegin', await createPaginationBar({ data: pageData }));
  addPaginationBarListener(pagination);
  /***********************/

  reviews.forEach((review) => {
    reviewBody.insertAdjacentHTML('beforeend', makeReviewContainerHTML(review));
  });

  // 삭제 버튼 이벤트 등록
  const deleteButtons = reviewBody.getElementsByClassName('delete-button');
  Array.from(deleteButtons).forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const isDelete = confirm('리뷰를 삭제하시겠습니까?\n리뷰는 다시 등록할 수 없습니다.');

      if (isDelete) {
        await Api.delete(`/review/${reviews[index]._id}/delete`);
        alert('리뷰가 삭제되었습니다.');
        window.location.reload();
      }
    });
  });

  // 수정 버튼 이벤트 등록
  const updateButtons = reviewBody.getElementsByClassName('update-button');
  Array.from(updateButtons).forEach((updateButton, index) => {
    updateButton.addEventListener('click', (e) => open(e, reviews[index]));
  });
})();

function makeReviewContainerHTML(review) {
  return `
  <div class="review-container">
    <div class="review-button-container">
      <input type="button" class="update-button" value="수정">
      <input type="button" class="delete-button" value="삭제">
    </div>
    <div class="review-head">
        <div class="writer">${review.writer.email}</div>
        <div class="review-date">${getDate(review.createdAt)}</div>
    </div>
    <div class="product-name-options">
        <div class="image-box"
        style="background-image:url('${review.productId.imagePath[0]}')"
        onclick="
        window.location.href='/product?id=${review.productId._id}'
        "></div>
        <div class="options-box">
            <div class="product-name">${review.productId.productName}</div>
            <div class="options">${review.option.size} / ${review.option.color} 구매</div>
        </div>
    </div>
    <div class="review-rate">
        <span class="star"> 
            ★★★★★
            <span class="star-color" style="width:${10 * review.rate}%">★★★★★</span>
        </span>
    </div>
    <div class="review-content">${review.content}</div>
    <div class="review-image">
        ${imageComponent(review.imagePath)}
    </div>
  </div>
  `;
}

function imageComponent(imagePaths) {
  return imagePaths.reduce((acc, path) => {
    return acc + `<img src="${path}" alt="review image" class="review-image-unit"></img>`;
  }, '');
}

// 날짜 전처리
function getDate(orderDate) {
  let [date, time] = orderDate.split('T');
  date = date.replaceAll('-', '.');
  time = time.split('.')[0];
  return `${date} ${time}`;
}

function refreshModalContents() {
  contentValue.value = ''; // 글 내용 지우기
  inputFile.value = ''; // 이미지 지우기
  modalImages.innerHTML = ''; // 이미지 테그 지우기
}

registerButton.addEventListener('click', async (e) => {
<<<<<<< HEAD
  const rate = parseInt(starSpan.style.width);

=======
  
  const rate = parseInt(starSpan.style.width) / 10;
  
>>>>>>> f494398d4b991de86c2fed26a64a3df2a0e44d50
  if (!contentValue.value) {
    alert('리뷰 내용을 입력해주세요');
  } else {
    const formData = new FormData();

    for (const file of inputFile.files) {
      formData.append('images', file);
    }

    const res = await fetch('/image/register', {
      method: 'post',
      body: formData,
    });

    const imagePath = await res.json();

    const reqBody = {
      content: contentValue.value,
      rate,
      imagePath,
    };

    await Api.patch(`/review/${reviewId}/update`, '', reqBody);

    alert('리뷰가 수정되었습니다.');
    window.location.reload();
  }
});

inputFile.addEventListener('change', (event) => {
  for (const image of event.target.files) {
    let reader = new FileReader();

    reader.onload = (e) => {
      let img = document.createElement('img');
      img.setAttribute('src', e.target.result);
      modalImages.appendChild(img);
      modalImages.lastElementChild.classList.add('modal-image-unit');
    };
    reader.readAsDataURL(image);
  }
});

/*********************별점 관련 이벤트********************/
starInput.addEventListener('input', (e) => {
  starSpan.style.width = `${e.target.value * 10}%`;
});
/********************************************************/
