import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseURL, endpoint_2 } from '../../httpconf/httpconf.js';
import { Trend } from 'k6/metrics';

let APITrend = new Trend('updateNewUser_Response_Time');

export function update_NewUser () {
    const url_endpoint_2 = baseURL + endpoint_2;

    const payload_body = JSON.stringify({
        "name": "morpheus",
        "job": "leader"
    });

    const param_header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const req_Package = http.post(url_endpoint_2, payload_body, param_header);
    // console.log(req_Package.body);
    // console.log(req_Package.status)
    check(req_Package, {
      "response code was 201": (r) => req_Package.status == 201,
      "Body contains Data": (r) => req_Package.body.includes(`"name":"morpheus"`)
    }
    );
    APITrend.add(String(req_Package.timings.duration));
    console.log('Response time of Package was ' + String(req_Package.timings.duration) + ' ms');
}