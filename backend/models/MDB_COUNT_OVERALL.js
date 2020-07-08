const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    company_id: { type: String, required: true },
    key: { type: String, required: true },
    count: { type: Number, required: true , default: 0},
});

class MDB_COUNT_OVERALL extends MODEL
{
    constructor()
    {
        super('db_count_overall', schema);
    }
}

module.exports = MDB_COUNT_OVERALL;