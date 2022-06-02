import * as Api from '/api.js';
import categoryStyle from '/category/category-style.js';

const createCategory = async (props) => {
  const categories = !props ? await Api.get('/category/list') : props.categories;

  return /* html */ `
  ${categoryStyle}
  <aside class="sidebar">
    <button class="close-button link">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="sidebar-links">
      <ul>
        ${categories
          .map(({ categoryName }) => {
            return /* html */ `
            <li>
              <a class="link" href="/products?category=${categoryName}">
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
}

function onClickCancelBtn(component) {
  const closeButton = component.querySelector('.close-button');
  const sidebar = component.querySelector('.sidebar');

  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

export { createCategory, addCategoryListener };
