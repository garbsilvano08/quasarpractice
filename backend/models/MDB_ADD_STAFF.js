const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    personal_information: { type: Object, required: true },
    company_details:      { type: Object, required: true },
    name:                 { type: String, required: true },
});

class MDB_ADD_STAFF extends MODEL
{
    constructor()
    {
        super('staff_list', schema);
    }
}

module.exports = MDB_ADD_STAFF;