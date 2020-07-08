const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    company_id: { type: String, required: true },
    key: { type: String, required: true },
    count: { type: String, required: true },
    date_string: { type: String, required: true }
});

class MDB_COUNT_MONTHLY extends MODEL
{
    constructor()
    {
        super('db_count_monthly', schema);
    }
}

module.exports = MDB_COUNT_MONTHLY;