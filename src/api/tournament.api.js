import MainService from './main.api';

class TournamentService extends MainService {
    constructor() {
        super('tournament');
    }
}

const tournamentService = new TournamentService;

export default tournamentService;