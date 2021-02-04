import http from "../http-common";

class ThingDataService {
  getAll() {
    return http.get('/things');
  }

  get(id) {
    return http.get(`/things/${id}`);
  }

  create(data) {
    return http.post('/things', data);
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

  findByTitle(title) {
    return http.get(`/things?title=${title}`);
  }
}

export default new ThingDataService();
