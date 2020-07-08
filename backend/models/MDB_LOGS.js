const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    name: { type: String, required: true },
    idCardNum: { type: String, required: true },
    currentTime: { type: String, required: true },
    imageFlag: { type: String, required: true },
    imageName: { type: String, required: true },
    type: { type: String, required: true },
    tempratrue: { type: String, required: true },
    mask: { type: String, required: true },
    image_path: { type: String, required: true },
    device_id: { type: String, required: true },
    id: { type: String, required: true },
    syncing: { type: Boolean, required: true },
    id: { type: String, required: true }

});

class MDB_LOGS extends MODEL
{
    constructor()
    {
        super('db_logs', schema);
    }
}

module.exports = MDB_LOGS;