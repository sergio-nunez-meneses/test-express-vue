import http from '../http-common';

class ThingDataService {
  create(data) {
    return http.post('/things', data);
  }

  getAll() {
    return http.get('/things');
  }

  findByTitle(title) {
    return http.get(`/things?title=${title}`);
  }

  deleteAll() {
    return http.delete(`/things`);
  }
}

export default new ThingDataService();
