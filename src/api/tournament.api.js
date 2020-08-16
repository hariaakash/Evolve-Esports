import MainService from './main.api';

class TournamentService extends MainService {
    constructor() {
        super('tournament');
    }
    join(data) {
        return this.http.post(`tournament/join`, data);
    }
}

const tournamentService = new TournamentService;

export default tournamentService;