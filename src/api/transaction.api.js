import MainService from './main.api';

class TransactionService extends MainService {
    constructor() {
        super('transaction');
    }
    join(data) {
        return this.http.post('transaction/cancel', data);
    }
    paid(data) {
        return this.http.post('transaction/paid', data);
    }
    cancel(data) {
        return this.http.post('transaction/cancel', data);
    }
}

const transactionService = new TransactionService;

export default transactionService;