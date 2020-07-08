const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    account_img:        { type: String,  required: true },
    last_name:          { type: String,  required: true },
    middle_name:        { type: String,  required: true },
    given_name:         { type: String,  required: true },
    gender:             { type: String,  required: true },
    birthday:           { type: Date,    required: true },
    nationality:        { type: String,  required: true },
    home_address:       { type: String,  required: true },
    contact_number:     { type: String,  required: true },
    emergency_contact:  { type: String,  required: true },
    company_name:       { type: String,  required: true },
    reason_blacklist:   { type: String,  required: true },
    date_blacklisted:   { type: Date  ,  required: true },
    is_active:          { type: Boolean, required: true }
});

class MDB_ADD_BLACKLIST extends MODEL
{
    constructor()
    {
        super('black_list', schema);
    }
}

module.exports = MDB_ADD_BLACKLIST;