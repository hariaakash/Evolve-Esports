import MainService from './main.api';

class MatchService extends MainService {
    constructor() {
        super('public');
    }
    tournamentMain(data) {
        return this.http.post(`${this.entity}/tournament/main`, data);
    }
}

const matchService = new MatchService;

export default matchService;