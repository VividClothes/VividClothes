import profileStyle from '/profile/profile-form-style.js';

const createProfile = (props) => {
  const { email, fullName, phoneNumber, address } = props;

  return /* html */ `
  ${profileStyle}
  <div class="user-info-container">
    <form class="user-info-form">
      <div class="row">
        <h4>${fullName}<span>  님의 기본 정보</span></h4>
        <div class="tooltip-wrapper">
          <label class="user-info-label">◾  Email</label>
          <span class="tooltip">해당 영역은 수정하실 수 없습니다.</span>
        </div>
        <div class="tooltip-effect input-group-icon">
          <input class="user-info-email" type="email" value="${email}" disabled />
          <div class="input-icon">
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>
        <label class="user-info-label">◾ Name</label>
        <div class="input-group input-group-icon">
          <input class="user-info-name" type="text" value="${fullName}" />
          <div class="input-icon">
            <i class="fa fa-user"></i>
          </div>
        </div>
        <div class="tooltip-wrapper">
          <label class="user-info-label">◾ Phone Number</label>
          <span class="tooltip">연락처는 "-"를 제외해주세요.</span>
        </div>
        <div class="tooltip-effect input-group input-group-icon">
          <input class="user-info-phone-number" type="text" value="${
            phoneNumber ? phoneNumber : ''
          }" />
          <div class="input-icon">
            <i class="fa-solid fa-phone"></i>
          </div>
        </div>
        
        <label class="user-info-label">◾ Adress</label>
        <div class="input-group input-group-icon">
          <input class="post-number" type="text" id="post-number" placeholder="우편번호" value="${
            address ? address.postalCode : ''
          }" disabled>
          <div class="input-icon">
            <i class="fa-solid fa-map-location"></i>
          </div>
          <button class="post-btn">주소 찾기</button>
          <span id="guide" style="color:#999;display:none"></span>
          <input class="post-inputs" type="text" id="post-road-adress" placeholder="도로명주소" value="${
            address ? address.address1 : ''
          }" disabled>
          <input class="post-inputs" type="text" id="post-detail-adress" placeholder="상세주소" value="${
            address ? address.address2 : ''
          }" disabled>
        </div>
      </div>
      <div>
        <button class="user-info-edit-btn" type="submit">수정하기</button>
      </div>
    </form>
  </div>
`;
};

function addProfileListener(component) {
  onClickAdressBtn(component);
  onMouseoverInputs(component);
  onSubmitForm(component);
}

function onClickAdressBtn(component) {
  const postNumber = component.querySelector('#post-number');
  const postRoadAdress = component.querySelector('#post-road-adress');
  const postDetailAdress = component.querySelector('#post-detail-adress');
  const postBtn = component.querySelector('.post-btn');

  if (postNumber.value && postRoadAdress) {
    postDetailAdress.disabled = false;
  }

  postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ''; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        postNumber.value = data.zonecode;
        postRoadAdress.value = roadAddr;

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if (roadAddr !== '') {
          postRoadAdress.value += extraRoadAddr;
        } else {
          postDetailAdress.value = '';
        }

        const guideTextBox = document.getElementById('guide');
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
          guideTextBox.style.display = 'block';
        } else if (data.autoJibunAddress) {
          const expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
          guideTextBox.style.display = 'block';
        } else {
          guideTextBox.innerHTML = '';
          guideTextBox.style.display = 'none';
        }
        postDetailAdress.disabled = false;
      },
    }).open();
  });
}

function onMouseoverInputs(component) {
  const inputs = component.querySelectorAll('.tooltip-effect');
  const tooltips = component.querySelectorAll('.tooltip');

  Array.from(inputs).forEach((input, index) => {
    input.addEventListener('mouseenter', () => {
      tooltips[index].classList.add('tooltip-hover-effect');
    });
  });

  Array.from(inputs).forEach((input, index) => {
    input.addEventListener('mouseleave', () => {
      tooltips[index].classList.remove('tooltip-hover-effect');
    });
  });
}

function onSubmitForm(component) {
  const userInfoForm = component.querySelector('.user-info-form');

  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modalForm = document.querySelector('.modal-form');
    modalForm.setAttribute('id', 'edit-user');
    document.querySelector('#password-modal > .modal-layout').classList.add('show-modal');
  });
}

export { createProfile, addProfileListener };
