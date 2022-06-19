import * as Api from '/api.js';

const createConfirmModalForm = (props) => {
  const { btnText } = props;

  return /* html */ `
    <form class="modal-form">
      <ul class="modal-ul">
        <li class="modal-li">
          <label class="modal-label" htmlFor="product-name">
            비밀번호를 입력하세요.
          </label>
          <input class="modal-input" type="password" id="confirm-password" />
        </li>                   
      </ul>
      <button class="modal-button" type="submit">
        ${btnText}
      </button>
    </form>
  `;
};

function addConfirmModalFormListener(component) {
  onClickSubmitBtn(component);
}

function onClickSubmitBtn(component) {
  const fullName = document.querySelector('.user-info-name');
  const phoneNumber = document.querySelector('.user-info-phone-number');
  const addressCode = document.querySelector('#post-number');
  const addressRoad = document.querySelector('#post-road-adress');
  const addressDetail = document.querySelector('#post-detail-adress');
  const password = component.querySelector('.modal-input[id=confirm-password]');
  const submitForm = component.querySelector('.modal-form');

  submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitForm.getAttribute('id') === 'edit-user') {
      const address = {
        postalCode: addressCode.value,
        address1: addressRoad.value,
        address2: addressDetail.value,
      };

      const data = {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        address,
        currentPassword: password.value,
      };

      try {
        const result = await Api.patch('/api/users', '', data);
        console.log(result);
      } catch (err) {
        console.log(err);
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      alert('회원정보 수정이 완료되었습니다.');
      window.location.reload();
    }

    if (submitForm.getAttribute('id') === 'delete-user') {
      const reqBody = JSON.stringify({ currentPassword: password.value });

      try {
        const res = await fetch('/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: reqBody,
        });

        if (!res.ok) {
          const errorContent = await res.json();
          const { reason } = errorContent;

          throw new Error(reason);
        }
      } catch (err) {
        console.log(err);
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      alert('회원정보 삭제가 완료되었습니다.');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('hashedEmail');
      window.location.href = '/';
    }
  });
}

export { createConfirmModalForm, addConfirmModalFormListener };
