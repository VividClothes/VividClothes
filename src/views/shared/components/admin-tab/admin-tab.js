import adminTabStyle from '/admin-tab/admin-tab-style.js';

const createAdminTab = (tabs) => /* html */ `
  ${adminTabStyle}
  <div class="admin-tab-wrapper">
    <div class="admin-tab-title">
      <span>관리자 탭<span>
    </div>
    <div class="admin-tap-content">
      ${tabs
        .map(
          (tab, index) => /* html */ `
        <input type="radio" name="slider" ${index === 0 ? 'checked' : ''} id="${tab.id}">
      `
        )
        .join('')}
      <div class="tab-list">
      ${tabs
        .map(
          (tab) => /* html */ `
        <label for="${tab.id}">
          ${tab.icon}
          <span class="tab-title">${tab.title}</span>
        </label>
        <div class="slider"></div>
      `
        )
        .join('')}
      </div>
    </div>
  </div>
`;

export { createAdminTab };
