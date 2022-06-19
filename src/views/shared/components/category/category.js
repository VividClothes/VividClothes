import * as Api from '/api.js';
import categoryStyle from '/category/category-style.js';

const createCategory = async (props) => {
  const categories = !props ? await Api.get('/category/list') : props.categories;

  return /* html */ `
  ${categoryStyle}
  <aside class="sidebar">
    <div class="mobile-search">
      <div class="wrapper">
        <div class="searchBar">
          <input class="searchQueryInput" type="text" name="searchQueryInput" placeholder="제품 검색" value="" />
          <button class="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>

    <button class="close-button link">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="sidebar-links">
      <ul>
        ${categories
          .map(({ categoryName }) => {
            return /* html */ `
            <li>
              <a class="link" href="/products?category=${categoryName}&page=1">
                <span class="link-text">${categoryName}</span>
              </a>
            </li>`;
          })
          .join('')}
      </ul>
    </div>
  </aside>
  `;
};

function addCategoryListener(component) {
  onClickCancelBtn(component);
  searchEvents(component);
}

function onClickCancelBtn(component) {
  const closeButton = component.querySelector('.close-button');
  const sidebar = component.querySelector('.sidebar');

  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

function searchEvents(component) {
  const searchProductButton = component.querySelector('.searchQuerySubmit');
  const searchQuerySubmit = component.querySelector('.searchQueryInput');

  searchProductButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = component.querySelector('.searchQueryInput').value;
    if (!searchInput) {
      alert('제품명을 입력해주세요.');
    } else {
      window.location.href = `/products?searchInput=${searchInput}&page=1`;
    }
  });

  searchQuerySubmit.addEventListener('keyup', (e) => {
    e.preventDefault();
    console.log(1);
    if (window.event.keyCode == 13) {
      const searchInput = component.querySelector('.searchQueryInput').value;
      if (!searchInput) {
        alert('제품명을 입력해주세요.');
      } else {
        window.location.href = `/products?searchInput=${searchInput}&page=1`;
      }
    }
  });
}

export { createCategory, addCategoryListener };
