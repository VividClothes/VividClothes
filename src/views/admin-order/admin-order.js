// APIs
import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import { header, addHeaderEventListener } from '/header/header.js';
import { createAdminTab } from '/admin-tab/admin-tab.js';
import { adminOrderTabData } from '/admin-tab/admin-tab-data.js';
import { createAdminOrderList } from '/admin-order/admin-order-list.js';
import category from '/category/category.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';

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
  }

  async createDOM() {
    this.header.insertAdjacentElement('afterbegin', header);
    this.layout.insertAdjacentHTML('afterbegin', layout());
    this.adminTab.insertAdjacentHTML('afterbegin', createAdminTab(adminOrderTabData));

    const categories = await Api.get('/category/list');
    this.category.insertAdjacentHTML('afterbegin', await category({ categories }));

    this.titleSection.insertAdjacentHTML(
      'afterbegin',
      titleSection({
        title: '관리자 설정',
        subTitle: '주문 관리',
      })
    );

    const orders = await Api.get('/order/list');

    this.titleSection.insertAdjacentHTML('afterend', createAdminOrderList(orders));
  }

  addAllEvents() {
    addHeaderEventListener();
    addComponentEvents(this.category);
    addComponentEvents(this.titleSection);
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
