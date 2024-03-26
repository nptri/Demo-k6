import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenario:{
        vus: 1
  }
}

export default function () {
    let correlation_id = uuidv4();
    const url_token = `https://stg.login.account.rakuten.com/util/gc?tracking_id=${correlation_id}&client_id=wallet`;
    // sleep(1);
    const payload_body = JSON.stringify({
      "page_type": "LOGIN_START"
    });
    const param_header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const req_Token = http.post(url_token, payload_body, param_header);
    console.log(req_Token.body);
    check(req_Token, {
      "response code was 200": (req_Token) => req_Token.status == 200,
      "Body contains Token": (req_Token) => req_Token.body.includes('token')
    }
    );
}