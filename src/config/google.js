// import {OAuth2Client}
//passport 사용안하고 구현
import { OAuth2Client } from 'google-auth-library';
i;
const CLIENT_ID =
  '196598776648-dbu1p15dcgeotoi1rirs6eu63v3l5qom.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function verify() {
  const ticket = await client.verifyIdToken({
    //idtoken을 .. 어디에 담아주는거임
    idToken: client.credentials.id_token,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}
verify()
  .then(() => {})
  .catch(console.error);

// 공식문서에는 verify().catch(console.error) 이렇게 되어 있는데
// 굳이 중간에 then을 해줘야 하는지 알아보기

//https://yohanpro.com/posts/codereview
//https://uju-tech.tistory.com/entry/Nodejs-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0-google

//clientid : 196598776648-dbu1p15dcgeotoi1rirs6eu63v3l5qom.apps.googleusercontent.com
// pw: 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

export default verify;