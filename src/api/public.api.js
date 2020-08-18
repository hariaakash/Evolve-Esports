import MainService from './main.api';

class MatchService extends MainService {
    constructor() {
        super('public');
    }
    tournamentMain(data) {
        return this.http.post(`${this.entity}/tournament/main`, data);
    }
    tournamentScore(data) {
        return this.http.post(`${this.entity}/tournament/score`, data);
    }
    matchNext() {
        return this.http.post(`${this.entity}/match/next`);
    }
}

const matchService = new MatchService;

export default matchService;