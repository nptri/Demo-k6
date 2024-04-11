import http from 'k6/http';
import { check, sleep } from 'k6';
// import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenario:{
        vus: 1
  }
}

export default function () {

    // let correlation_id = uuidv4();
    const url_endpoint = `https://reqres.in/api/users`;

    const payload_body = JSON.stringify({
        "name": "morpheus",
        "job": "leader"
    });

    const param_header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const req_Package = http.post(url_endpoint, payload_body, param_header);
    console.log(req_Package.body);
    check(req_Package, {
      "response code was 201": (r) => req_Package.status == 201,
      "Body contains Data": (r) => req_Package.body.includes(`"name":"morpheus"`)
    }
    );

}