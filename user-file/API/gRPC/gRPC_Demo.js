import { Client, StatusOK } from 'k6/net/grpc';
import { check } from 'k6';
// import { Trend } from 'k6/metrics';

const client = new Client();
client.load(['/Users/ts-nguyenphuc.tri/Desktop/project/k6/user-file/API/gRPC/protobuf'], '/hello.proto'); //define proto file
// let APITrend = new Trend('UNARY_gRPC_time');

export function UNARY_gRPC (){
    client.connect('grpcbin.test.k6.io:9001', {});
    const data = { greeting: 'TriNP' };
    const response = client.invoke('hello.HelloService/SayHello', data);

    check(response, {
        'status is OK': (responseBody) => responseBody && responseBody.status == StatusOK,
    });
    console.log(JSON.stringify(response.message));
    client.close();

    // APITrend.add(String(response.timings.durations));
    // console.log('Response time of UNARY gRPC was ' + String(response.timings.durations) + ' ms');
}