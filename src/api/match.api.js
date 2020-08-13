import MainService from './main.api';

class MatchService extends MainService {
    constructor() {
        super('match');
    }
    remove(data) {
        return this.http.post(`admin/match/remove`, data);
    }
}

const matchService = new MatchService;

export default matchService;