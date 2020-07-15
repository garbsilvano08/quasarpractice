const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{

    person_img:         { type: String,  required: false },
    last_name:          { type: String,  required: false },
    middle_name:        { type: String,  required: false },
    given_name:         { type: String,  required: false },
    gender:             { type: String,  required: false },
    birthday:           { type: Date,    required: false },
    nationality:        { type: String,  required: false },
    home_address:       { type: String,  required: false },
    contact_number:     { type: String,  required: false },
    emergency_contact:  { type: String,  required: false },
    date_created:       { type: Date  ,  required: false },
    is_active:          { type: Boolean, required: false },
    category:           { type: String,  required: false },
    
    // Staff
    position:           { type: String,  required: false },
    
    // Visitor
    purpose_visit:      { type: String,  required: false },
    contact_person:     { type: String,  required: false },
    destination:        { type: String,  required: false },
    
    // Blacklist
    reason_blacklist:   { type: String,  required: false },

    company_name:       { type: String,  required: false },
    company_id:         { type: String,  required: false },

    frontdesk_person_id:    { type: String,  required: false },
    frontdesk_person_date:  { type: Date,  required: false },
    date_string: { type: String,  required: false },
});

class MDB_PERSON extends MODEL
{
    constructor()
    {
        super('db_person', schema);
    }
}

module.exports = MDB_PERSON;