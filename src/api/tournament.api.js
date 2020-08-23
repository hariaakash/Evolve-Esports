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
    remove(data) {
        return this.http.post(`admin/tournament/remove`, data);
    }
    toggleStatus(data) {
        return this.http.post(`admin/tournament/team/toggleStatus`, data);
    }
    kick(data) {
        return this.http.post(`admin/tournament/team/kick`, data);
    }
}

const tournamentService = new TournamentService;

export default tournamentService;