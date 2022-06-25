import { loginQuery } from '/indexedDB.js';

//쿠기 값 삭제
const deleteCookie = (key) => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  
//쿠기 값 가져오기
const getCookieValue = (cookie) => {
  let cookies = cookie.split(';')
                      .map(e => e.trim())
                      .reduce((acc, cur) => {
                          const temp = cur.split('=')
                          return {
                              ...acc,
                              [temp[0]]: temp[1]
                          }
                      }, {})
  return [cookies.token, cookies.userRole, cookies.hashedEmail]
}

const [token, userRole, hashedEmail] = getCookieValue(document.cookie);
localStorage.setItem('token', token);
localStorage.setItem('role', userRole);
localStorage.setItem('hashedEmail', hashedEmail);

const tokenCheck = localStorage.getItem('token');

// indexedDB 생성
if (tokenCheck) {
    loginQuery(hashedEmail);

    alert(`정상적으로 로그인되었습니다.`);
    window.location.href = '/';
} else {
    alert('카카오 로그인에 실패하였습니다. 다시 시도 해주세요');
    window.location.href = '/login';
}
