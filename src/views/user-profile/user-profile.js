import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import { header, addHeaderEventListener } from '/header/header.js';
import { createAdminTab } from '/admin-tab/admin-tab.js';
import { adminOrderTabData } from '/admin-tab/admin-tab-data.js';
import category from '/category/category.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';
import { createProfile, addProfileListener } from '/profile/profile.js';

class UserProfile {
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
    this.profile = document.getElementById('profile');
  }

  async createDOM() {
    this.header.insertAdjacentElement('afterbegin', header);
    this.layout.insertAdjacentHTML('afterbegin', layout());
    // this.adminTab.insertAdjacentHTML('afterbegin', createAdminTab(adminOrderTabData));

    const categories = await Api.get('/category/list');
    this.category.insertAdjacentHTML('afterbegin', await category({ categories }));

    this.titleSection.insertAdjacentHTML(
      'afterbegin',
      titleSection({
        title: '회원 정보',
        subTitle: '기본 정보',
      })
    );

    this.profile.insertAdjacentHTML('afterbegin', createProfile());
  }

  addAllEvents() {
    addHeaderEventListener();
    addComponentEvents(this.category);
    addComponentEvents(this.titleSection);
    addProfileListener(this.profile);
  }

  async render() {
    await this.createDOM();
    this.addAllEvents();
  }
}

window.onload = () => {
  const userProfile = new UserProfile();
  userProfile.render();
};
