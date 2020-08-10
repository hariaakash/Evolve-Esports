import MainService from './main.api';

class MatchService extends MainService {
    constructor() {
        super('match');
    }
}

const matchService = new MatchService;

export default matchService;