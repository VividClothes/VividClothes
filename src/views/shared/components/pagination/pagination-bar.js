import * as Api from '/api.js';
import paginationStyle from '/pagination/pagination-bar-style.js';
import paginateUtil from '/pagination/pagination-util.js';

const createPaginationBar = async (props) => {
  const { page, perPage, totalPage, pageUrl } = props.data;

  const maxSize = 5;

  const { pages } = paginateUtil(totalPage * perPage, page, perPage, maxSize);

  const backUrl = page - 1 === 0 ? page : page - 1;
  const frontUrl = page + 1 >= totalPage ? page : page + 1;

  return /* html */ `
  ${paginationStyle}
  <ul class="page">
      <li class="page__btn page-left-btn pagi-icon" data-prev="${pageUrl(
        backUrl
      )}" ><i class="fa-solid fa-chevron-left" data-prev="${pageUrl(backUrl)}"></i></li>
      ${
        pages.length === 0
          ? ` <a href="${pageUrl(1)}">
            <li class="page-numbers active" data-number="${1}">${1}</li>
          </a>`
          : ''
      }
      ${Array.from(pages)
        .map((currentPage) => {
          return /* html */ `
          <a href="${pageUrl(currentPage)}">
          <li class="page-numbers ${
            currentPage === Number(page) ? 'active' : ''
          }" data-number="${currentPage}">${currentPage}</li>
          </a>
          `;
        })
        .join('')}
      <li class="page__btn pagi-icon page-right-btn" data-next="${pageUrl(
        frontUrl
      )}"><i class="fa-solid fa-chevron-right" data-next="${pageUrl(frontUrl)}"></i></li>
    </ul>
  `;
};

function addPaginationBarListener(component) {
  onClickLeftArrow(component);
  onClickRightArrow(component);
}

function onClickLeftArrow(component) {
  const leftBtn = component.querySelector('.page-left-btn');
  leftBtn.addEventListener('click', (e) => {
    window.location.href = `${e.target.dataset.prev}`;
  });
}

function onClickRightArrow(component) {
  const rightBtn = component.querySelector('.page-right-btn');
  rightBtn.addEventListener('click', (e) => {
    window.location.href = `${e.target.dataset.next}`;
  });
}

export { createPaginationBar, addPaginationBarListener };
