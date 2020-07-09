const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{

    person_img:         { type: String,  required: true },
    last_name:          { type: String,  required: true },
    middle_name:        { type: String,  required: true },
    given_name:         { type: String,  required: true },
    gender:             { type: String,  required: true },
    birthday:           { type: Date,    required: true },
    nationality:        { type: String,  required: true },
    home_address:       { type: String,  required: true },
    contact_number:     { type: String,  required: true },
    emergency_contact:  { type: String,  required: true },
    date_created:       { type: Date  ,  required: true },
    is_active:          { type: Boolean, required: true },
    category:           { type: String,  required: true },
    
    // Staff
    position:           { type: String,  required: false },
    
    // Visitor
    purpose_visit:      { type: String,  required: false },
    contact_person:     { type: String,  required: false },
    destination:        { type: String,  required: false },
    
    // Blacklist
    reason_blacklist:   { type: String,  required: false },

    company_name:       { type: String,  required: false },

    frontdesk_person_id:    { type: String,  required: false },
    frontdesk_person_date:  { type: Date,  required: false }
});

class MDB_PERSON extends MODEL
{
    constructor()
    {
        super('db_person', schema);
    }
}

module.exports = MDB_PERSON;