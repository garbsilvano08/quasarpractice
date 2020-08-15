const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    id:                 { type: String, required: true },
    name:               { type: String, required: false },
    person_device_id:   { type: String, required: true },
    // imageFlag:          { type: String, required: true },
    imageName:          { type: String, required: true },
    // type:               { type: String, required: true },
    temperature:        { type: String, required: true },
    mask:               { type: String, required: true },
    image_path:         { type: String, required: true },
    person_id:          { type: String, required: false },
    syncing:            { type: Boolean, required: true },
    company_id:         { type: String, required: false },
    device_id:          { type: String, required: true },
    device_type:        { type: String, required: false },

    date_string:        { type: String, required: true },
    date_logged:        { type: Date, required: true },
    has_fever:          { type: Boolean, required: true, default: false }
});

class MDB_LOGS extends MODEL
{
    constructor()
    {
        super('db_logs', schema);
    }
}

module.exports = MDB_LOGS;