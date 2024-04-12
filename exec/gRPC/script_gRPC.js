import { Client, StatusOK } from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new Client();
client.load(['/Users/ts-nguyenphuc.tri/Desktop/project/k6/user-file/API/gRPC/protobuf'], '/hello.proto'); //define proto file

export const options = {
    scenarios:{
        getUser_then_UpdateUser: {
          executor: 'constant-arrival-rate', // https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/
          duration: 10000,
          rate: 1,
          preAllocatedVUs: 10,
          timeUnit: "1s",
        }
  }
}

export default function () {
    client.connect('grpcbin.test.k6.io:9001', {});
    const data = { greeting: 'TriNP' };
    const response = client.invoke('hello.HelloService/SayHello', data);

    check(response, {
        'status is OK': (responseBody) => responseBody && responseBody.status == StatusOK,
    });

    console.log(JSON.stringify(response.message));

    client.close();
}