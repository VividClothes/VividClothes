import { header } from '/header.js';

addAllElements();

async function addAllElements() {
  insertHeader();
}


function insertHeader() {
  document.body.insertAdjacentElement('afterbegin', header);
}