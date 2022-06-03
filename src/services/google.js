import { OAuth2Client } from 'google-auth-library';
import { userModel } from '../db';

async function verify(credential) {
  const client = new OAuth2Client(process.env.ClIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.ClIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

//https://yohanpro.com/posts/codereview
//https://uju-tech.tistory.com/entry/Nodejs-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0-google

//clientid : 196598776648-dbu1p15dcgeotoi1rirs6eu63v3l5qom.apps.googleusercontent.com
// pw: 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

export default verify;
