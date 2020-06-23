const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;


const schema         = new Schema({
    SENDER_ID: {
        type: Number,
        required: true
    },
    RECIEVER_ID: {
        
        type: Number,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    date_created: {
        type:       Date,
        required:   true
    }
});

class MDB_TRANSACTION_HISTORY extends MODEL {
    constructor () {
        super('transtactions', schema);
    }
}

module.exports = MDB_TRANSACTION_HISTORY;