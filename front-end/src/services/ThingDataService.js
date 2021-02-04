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

  get(id) {
    return http.get(`/things/${id}`);
  }

  update(id, data) {
    return http.put(`/things/${id}`, data);
  }

  delete(id) {
    return http.delete(`/things/${id}`);
  }

  deleteAll() {
    return http.delete(`/things`);
  }
}

export default new ThingDataService();
