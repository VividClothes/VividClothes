function addHeaderEvents(component) {
  const dropdownTrigger = component.querySelector('.dropdown-trigger');
  const dropdownMenu = component.querySelector('.dropdown-menu');
  const logoutButton = component.querySelector('.logout');
  const hamburgerMenu = component.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  dropdownTrigger.addEventListener('click', () => {
    dropdownTrigger.classList.toggle('clicked');
    dropdownMenu.classList.toggle('show');
  });

  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('hashedEmail');
    window.location.href = '/';
  });

  hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.add('open');
  });
}

function addCategoryEvents(component) {
  const closeButton = component.querySelector('.close-button');
  const sidebar = component.querySelector('.sidebar');

  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

function addModalEvents(component) {
  const modalLayouts = component.querySelectorAll('.modal-layout');
  const closeButtons = component.querySelectorAll('.modal-header-close');

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalLayouts.forEach((modal) => {
        modal.classList.remove('show-modal');
      });
    });
  });
}

export function addComponentEvents(component) {
  const { id } = component;

  switch (true) {
    case id === 'header':
      addHeaderEvents(component);
      break;

    case id === 'category':
      addCategoryEvents(component);
      break;
    case id === 'modal':
      addModalEvents(component);
      break;
  }
}
