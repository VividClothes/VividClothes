import * as Api from '/api.js';
import { header } from '/header.js';

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertHeader();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

function insertHeader() {
  document.body.insertAdjacentElement('afterbegin', header);
}
