const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    full_name:      { type: String, required:   true },
    email:          { type: String, required:   true },
    username:       { type: String, required:   true },
    user_type:      { type: String, required:   true },
    user_picture:   { type: String, required:   true },
    company:        { type: Object, required:   false },
    date_created:   { type: Date  , required:   true },
    company_id:     { type: String, required:   false },
    is_active:      { type: Boolean,required:   true },
    time_log_in:    { type: Date  , required:   true },
    time_log_out:   { type: Date  , required:   false },
});

class MDB_USER_LOGS extends MODEL
{
    constructor()
    {
        super('db_user_logs', schema);
    }
}

module.exports = MDB_USER_LOGS;