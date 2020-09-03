const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    person_id:      { type: String,  required: true },
    company_id:     { type: String,  required: true },
    visit_purpose:  { type: String,  required: true },
    date_saved:     { type: Date,    required: true },
    contact_person: { type: String,  required: true },
    destination:    { type: String,  required: true },
    date_string:    { type: String,  required: true },
    delivery_name:  { type: String,  required: false }
});

class MDB_PURPOSE extends MODEL
{
    constructor()
    {
        super('db_purpose', schema);
    }
}

module.exports = MDB_PURPOSE;