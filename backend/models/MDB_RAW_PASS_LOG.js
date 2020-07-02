const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    data: { type: Object, required: true }
});

class MDB_RAW_PASS_LOG extends MODEL
{
    constructor()
    {
        super('raw_pass_logs', schema);
    }
}

module.exports = MDB_RAW_PASS_LOG;