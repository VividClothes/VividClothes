import * as Api from '/api.js';

// Utils
import { addComponentEvents } from '/components-event.js';

// Components
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener } from '/category/category.js';
import { createProfile, addProfileListener } from '/profile/profile-form.js';
import { createModal, addModalListener } from '/modal/modal.js';
import { confirmPasswordModalData } from '/modal/password-modal-data.js';
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
    this.passwordModal = document.getElementById('password-modal');
    this.layout = document.getElementById('layout');
    this.titleSection = document.getElementById('title-section');
    this.profile = document.getElementById('profile');
  }

  async createDOM() {
    this.header.insertAdjacentElement('afterbegin', header);
    this.layout.insertAdjacentHTML('afterbegin', layout());
    this.passwordModal.insertAdjacentHTML(
      'afterbegin',
      createModal({ data: confirmPasswordModalData })
    );

    const categories = await Api.get('/category/list');
    this.category.insertAdjacentHTML('afterbegin', await createCategory({ categories }));

    this.titleSection.insertAdjacentHTML(
      'afterbegin',
      titleSection({
        title: '회원 정보',
        subTitle: '기본 정보',
        extraContent: () => this.createTitleSectionLeft(),
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
    addModalListener(this.passwordModal);
    this.onClickDeleteBtn(this.titleSection);
  }

  createTitleSectionLeft() {
    return /* html */ `
      <style>
        .delete-user-btn {
          padding: 4px;
        }
      </style>
      <div class="delete-wrapper">
        <a href="#" >비밀번호 변경</a>
        <span> • </span>
        <a href="#" class="delete-user-btn">회원탈퇴</a>
      </div>
    `;
  }

  onClickDeleteBtn(component) {
    const deleteBtn = component.querySelector('.delete-user-btn');

    deleteBtn.addEventListener('click', () => {
      const modalForm = document.querySelector('.modal-form');
      console.log(modalForm);
      modalForm.setAttribute('id', 'delete-user');
      document.querySelector('#password-modal > .modal-layout').classList.add('show-modal');
    });
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
