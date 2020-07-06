const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    company_info: { type: Object, required: true }
});

class MDB_COMPANIES extends MODEL
{
    constructor()
    {
        super('companies', schema);
    }
}

module.exports = MDB_COMPANIES;