const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    mask:                   { type: String,  required: true },
    temperature:            { type: String,  required: true },

    person_id:              { type: String,  required: false },
    person_img:             { type: String,  required: true },
    full_name:              { type: String,  required: true },
    category:               { type: String,  required: false },
    company_name:           { type: String,  required: false },

    company_id:             { type: String,  required: false },
    device_id:              { type: String,  required: false },

    frontdesk_person_id:    { type: String,  required: false },
    date_logged:            { type: String,  required: false },
    date_saved:             { type: Date,    required: false },

    has_fever:              { type: Boolean, required: true },

    gender:                 { type: String, required: false },
    birthday:               { type: String, required: false },
    home_address:           { type: String, required: false },

});

class MDB_PERSON_LOGS extends MODEL
{
    constructor()
    {
        super('db_person_log', schema);
    }
}

module.exports = MDB_PERSON_LOGS;