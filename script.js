import http from 'k6/http';
import { check, sleep } from 'k6';
// import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenarios:{
        getUser_then_UpdateUser: {
          executor: 'constant-arrival-rate',
          duration: 30000,
          rate: 1,
          preAllocatedVUs: 30,
          timeUnit: 1,
        }
  }
}

export default function () {
    get_Data_User();  
    update_NewUser();
}

export function update_NewUser() {
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
     // console.log(req_Package.body);
     console.log(req_Package.status)
     check(req_Package, {
       "response code was 201": (r) => req_Package.status == 201,
       "Body contains Data": (r) => req_Package.body.includes(`"name":"morpheus"`)
     }
     );
}

export function get_Data_User(){
  const url_endpoint_2 = "https://reqres.in/api/users?page=2"
  const request_Call = http.get(url_endpoint_2);
  // console.log(request_Call.body)
  console.log(request_Call.status)
  check(request_Call, {
    "response code was 200": (req) => request_Call.status == 200,
    "Body contains Data of Get": (req) => request_Call.body.includes(`"per_page"`)
  }
  )
}