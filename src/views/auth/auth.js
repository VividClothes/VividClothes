import { loginQuery } from '/indexedDB.js';
  
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

// indexedDB 생성
if (token) {
    loginQuery(hashedEmail)
        .then((res) => {
            if(res) window.location.href = '/';
        });
} else {
    alert('카카오 로그인에 실패하였습니다. 다시 시도 해주세요');
    window.location.href = '/login';
}
