// APIs
import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import { header, addHeaderEventListener } from '/header/header.js';
import { createAdminOrderList, addAdminOrderListener } from '/admin-order/admin-order-list.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';
import { createPaginationBar, addPaginationBarListener } from '/pagination/pagination-bar.js';

class AdminOrder {
  constructor() {
    // Base DOM
    this.root = document.getElementById('root');
    this.main = document.getElementById('main');

    // Components
    this.header = document.getElementById('header');
    this.category = document.getElementById('category');
    this.adminTab = document.getElementById('admin-tab');
    this.layout = document.getElementById('layout');
    this.titleSection = document.getElementById('title-section');
    this.orderList = document.getElementById('order-list');
    this.pagination = document.getElementById('pagination');
  }

  async createDOM() {
    this.header.insertAdjacentElement('afterbegin', header);
    this.layout.insertAdjacentHTML('afterbegin', layout());
    // this.adminTab.insertAdjacentHTML('afterbegin', createAdminTab(adminOrderTabData));

    const categories = await Api.get('/category/list');
    this.category.insertAdjacentHTML('afterbegin', await createCategory({ categories }));

    this.titleSection.insertAdjacentHTML(
      'afterbegin',
      titleSection({
        title: '관리자 설정',
        subTitle: '주문 관리',
      })
    );

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    const perPage = 10;

    const orders = await Api.get(`/order`, `list?page=${page}&perPage=${perPage}`);

    let pageData = {
      page: orders.page,
      perPage: orders.perPage,
      totalPage: orders.totalPage,
    };

    pageData = {
      ...pageData,
      pageUrl: (page) => `/admin-order?page=${page}`,
    };

    this.pagination.insertAdjacentHTML('afterbegin', await createPaginationBar({ data: pageData }));

    this.orderList.insertAdjacentHTML('afterbegin', createAdminOrderList(orders.datas));
  }

  addAllEvents() {
    addHeaderEventListener();
    addCategoryListener(this.category);
    addComponentEvents(this.titleSection);
    addAdminOrderListener(this.orderList);
    addPaginationBarListener(this.pagination);
  }

  async render() {
    await this.createDOM();
    this.addAllEvents();
  }
}

window.onload = () => {
  const adminOrder = new AdminOrder();
  adminOrder.render();
};
