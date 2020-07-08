const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    person_id:  { type: String,  required: true },
    id_image:   { type: String,  required: true },
    id_number:  { type: String,  required: true },
    id_type:    { type: String,  required: true },
    date_saved: { type: Date,    required: true }
});

class MDB_IDENTIFICATION extends MODEL
{
    constructor()
    {
        super('db_identification', schema);
    }
}

module.exports = MDB_IDENTIFICATION;