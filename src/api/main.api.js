import httpClient from './httpClient';


class MainService {
    constructor(entity) {
        this.entity = entity;
        this.http = httpClient;
    }
    create(data) {
        return this.http.post(`${this.entity}/create`, data);
    }
    edit(data) {
        return this.http.post(`${this.entity}/edit`, data);
    }
    del(data) {
        return this.http.post(`${this.entity}/del`, data);
    }
    main(data) {
        return this.http.post(`${this.entity}/main`, data);
    }
}

export default MainService;