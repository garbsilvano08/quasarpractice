const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;


const schema         = new Schema({
    public_key : {
        type:       String,
        required:   true
    },
    private_key: {
        type:       String,
        required:   true
    },
    balance: {
        type:       Schema.Types.Decimal128,
        required:   true
    },
    USER_ID: {
        type:       String,
        required:   true
    }
});

class MDB_WALLETS extends MODEL {
    constructor() {
        super('wallets', schema);
    }
}

module.exports = MDB_WALLETS;