import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseURL, endpoint_1 } from '../../httpconf/httpconf.js';
import { Trend } from 'k6/metrics';

let APITrend = new Trend('getUserData_Response_Time');

export function get_Data_User (){
    const url_endpoint_1 = baseURL + endpoint_1;
    const request_Call = http.get(url_endpoint_1);
    // console.log(request_Call.body)
    // console.log(request_Call.status)
    check(request_Call, {
      "response code was 200": (req) => request_Call.status == 200,
      "Body contains Data of Get": (req) => request_Call.body.includes(`"per_page"`)
    }
    )
    APITrend.add(String(request_Call.timings.duration));
    console.log('Response time was ' + String(request_Call.timings.duration) + ' ms');
  }