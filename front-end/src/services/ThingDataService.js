import http from '../http-common';

class ThingDataService {
  create(data) {
    return http.post('/things', data);
  }
}

export default new ThingDataService();
