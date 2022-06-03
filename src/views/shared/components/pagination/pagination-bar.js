import * as Api from '/api.js';
import paginationStyle from '/pagination/pagination-bar-style.js';

const createPaginationBar = async (props) => {
  const { page, perPage, totalPage, pageUrl } = props.data;

  const showPage = 5;

  let va = page % showPage === 0 ? page : page % showPage;
  let first = page - va + 1;
  let last = page - va + showPage;

  if (last > totalPage) {
    last = totalPage;
  }

  let length = last % totalPage !== 0 ? last % totalPage : 1;

  const backUrl = page - 1 === 0 ? page : page - 1;
  const frontUrl = page + 1 >= totalPage ? page : page + 1;

  return /* html */ `
  ${paginationStyle}
  <ul class="page">
      <li class="page__btn page-left-btn pagi-icon" data-prev="${pageUrl(
        backUrl
      )}" ><i class="fa-solid fa-chevron-left" data-prev="${pageUrl(backUrl)}"></i></li>
      ${Array.from({ length: length })
        .map((v, i) => {
          const targetPage = first + i;

          return /* html */ `
          <a href="${pageUrl(targetPage)}">
          <li class="page-numbers ${
            targetPage === Number(page) ? 'active' : ''
          }" data-number="${targetPage}">${targetPage}</li>
          </a>
          `;
        })
        .join('')}
      <li class="page__btn pagi-icon page-right-btn" data-next="${pageUrl(
        frontUrl
      )}"><i class="fa-solid fa-chevron-right pagi-icon" data-next="${pageUrl(frontUrl)}"></i></li>
    </ul>
  `;
};

function addPaginationBarListener(component) {
  onClickLeftArrow(component);
  onClickRightArrow(component);
}

function onClickLeftArrow(component) {
  const leftBtn = component.querySelector('.page-left-btn');
  console.log(leftBtn);
  leftBtn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    window.location.href = `${e.target.dataset.prev}`;
  });
}

function onClickRightArrow(component) {
  const rightBtn = component.querySelector('.page-right-btn');
  console.log(rightBtn);
  rightBtn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    window.location.href = `${e.target.dataset.next}`;
  });
}

export { createPaginationBar, addPaginationBarListener };
