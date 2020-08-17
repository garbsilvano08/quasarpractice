const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    company_name:       { type: String,  required: true },
    device_id:          { type: String,  required: true },
    date_installed:     { type: Date,    required: true },
    date_created:       { type: Date,    required: true },
    company_info:       { type: Object,  required: true },
    device_ip:          { type: String,  required: true },
    company_id:         { type: String,  required: true },
    log_type:           { type: String,  required: true },
    count_logs:         { type: Number,  required: false, default: 0},
    device_type:        { type: String,  required: false},
    device_name:        { type: String,  required: false},
});

class MDB_DEVICE extends MODEL
{
    constructor()
    {
        super('devices', schema);
    }
}

module.exports = MDB_DEVICE;