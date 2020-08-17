import MainService from './main.api';

class TournamentService extends MainService {
    constructor() {
        super('tournament');
    }
    join(data) {
        return this.http.post(`tournament/join`, data);
    }
    nextMatch(data) {
        return this.http.post(`tournament/nextMatch`, data);
    }
}

const tournamentService = new TournamentService;

export default tournamentService;