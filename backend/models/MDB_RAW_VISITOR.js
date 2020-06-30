const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    personal_information: { type: Object, required: true },
    visitor_purpose:      { type: Object, required: true }
});

class MDB_RAW_VISITOR extends MODEL
{
    constructor()
    {
        super('raw_visitors', schema);
    }
}

module.exports = MDB_RAW_VISITOR;