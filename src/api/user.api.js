import MainService from './main.api';

class UserService extends MainService {
    constructor() {
        super('user');
    }
    self() {
        return this.http.post(`${this.entity}/self`);
    }
    oauth({ social, code }) {
        return this.http.post(`${this.entity}/oauth`, { social, code });
    }
}

export default new UserService;