import MainService from './main.api';

class AdminService extends MainService {
    constructor() {
        super('admin');
    }
    editUser(data) {
        return this.http.post(`${this.entity}/editUser`, data);
    }
}

export default new AdminService;