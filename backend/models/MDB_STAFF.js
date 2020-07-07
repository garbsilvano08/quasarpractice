const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    id_num:             { type: String,  required: true },
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
    position:           { type: String,  required: true },
    date_created:       { type: Date  ,  required: true },
    is_active:          { type: Boolean, required: true }
});

class MDB_ADD_STAFF extends MODEL
{
    constructor()
    {
        super('staff_list', schema);
    }
}

module.exports = MDB_ADD_STAFF;