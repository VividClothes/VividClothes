import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import { createProfile, addProfileListener } from '/profile/profile-form.js';
import layout from '/layout/layout.js';
import titleSection from '/layout/title-section.js';

class Profile {
  constructor() {
    // Base DOM
    this.root = document.getElementById('root');
    this.main = document.getElementById('main');

    // Components
    this.header = document.getElementById('header');
    this.category = document.getElementById('category');
    this.layout = document.getElementById('layout');
    this.titleSection = document.getElementById('title-section');
    this.profile = document.getElementById('profile');
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
        title: '회원 정보',
        subTitle: '기본 정보',
      })
    );

    const userInfo = await Api.get('/api/user');

    this.profile.insertAdjacentHTML('afterbegin', createProfile(userInfo));
  }

  addAllEvents() {
    addHeaderEventListener();
    addCategoryListener(this.category);
    addComponentEvents(this.titleSection);
    addProfileListener(this.profile);
  }

  async render() {
    await this.createDOM();
    this.addAllEvents();
  }
}

window.onload = () => {
  const profile = new Profile();
  profile.render();
};
