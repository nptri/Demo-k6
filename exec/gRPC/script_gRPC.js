// import { Client, StatusOK } from 'k6/net/grpc';
// import { check, sleep } from 'k6';
import {UNARY_gRPC} from '../../user-file/API/gRPC/gRPC_Demo.js';


// const client = new Client();
// client.load(['/Users/ts-nguyenphuc.tri/Desktop/project/k6/user-file/API/gRPC/protobuf'], '/hello.proto'); //define proto file

export const options = {
    scenarios:{
        UNARY_gRPC_Scenario: {
          executor: 'constant-arrival-rate', // https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/
          duration: 10000,
          rate: 1,
          preAllocatedVUs: 10,
          timeUnit: "1s",
        }
  }
}

export default function () {
    UNARY_gRPC();
}