import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener} from '/category/category.js';


/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async() => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/


/*****************************요소모음*******************************/
const reviewBody = document.querySelector('.review-container-helper');
/*******************************************************************/


(async () => {
  const reviews = await Api.get('/review/list');

  reviews.forEach((review) => {
    reviewBody.insertAdjacentHTML('beforeend', makeReviewContainerHTML(review));
  })


  // 삭제 버튼 이벤트 등록
  const deleteButtons = reviewBody.getElementsByClassName('delete-button');
  console.log(deleteButtons);
  Array.from(deleteButtons).forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const isDelete = confirm('리뷰를 삭제하시겠습니까?');

      if (isDelete) {
        await Api.delete(`/review/${reviews[index]._id}/delete`);
        alert('리뷰가 삭제되었습니다.');
        window.location.reload();
      }
    })
  })
  

})()


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
        style="background-image:url('/home-img3.jpg')"
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
  `
}

function imageComponent(imagePaths) {
  return imagePaths.reduce((acc, path) => {
    return acc + `<img src="${path}" alt="review image" class="review-image-unit"></img>`
  }, '')
}

// 날짜 전처리
function getDate(orderDate) {
  let [date, time] = orderDate.split('T');
  date = date.replaceAll('-', '.');
  time = time.split('.')[0]
  return `${date} ${time}`;
}