import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [{ duration: '4s', target: 120 }],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = 'http://172.17.0.1:8080/weather/current?lat=25&lon=45';

  const response = http.get(url);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
