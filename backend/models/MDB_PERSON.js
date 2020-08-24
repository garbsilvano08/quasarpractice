const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{

    person_img:         { type: String,  required: true },
    last_name:          { type: String,  required: true },
    middle_name:        { type: String,  required: true },
    given_name:         { type: String,  required: true },
    email:              { type: String,  required: false },
    gender:             { type: String,  required: false, default: 'Unknown'},
    birthday:           { type: Date,    required: true},
    nationality:        { type: String,  required: false, default: 'Unknown' },
    home_address:       { type: String,  required: true },
    contact_number:     { type: String,  required: true },
    emergency_contact:  { type: String,  required: false, default: 'Unknown' },
    date_created:       { type: Date  ,  required: true },
    is_active:          { type: Boolean, required: false, default: true },
    category:           { type: String,  required: true, default: 'Visitors' },
    
    // Staff
    position:           { type: String, required: false },
    location:           { type: Object, required: false},
    location_coordinates:{ type: Object, required: false},
    
    // Visitor
    purpose_visit:      { type: String,  required: false },
    contact_person:     { type: String,  required: false },
    destination:        { type: String,  required: false },
    
    // Blacklist
    reason_blacklist:   { type: String,  required: false },

    company_name:       { type: String,  required: false, default: 'none' },
    company_id:         { type: String,  required: false, default: 'none' },

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