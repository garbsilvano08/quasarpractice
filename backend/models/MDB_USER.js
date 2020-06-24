const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    full_name:      { type: String, required:   true },
    email:          { type: String, required:   true },
    password:       { type: String, required:   true },
});

class MDB_USERS extends MODEL
{
    constructor ()
    {
        super('users', schema);
    }
    async findByEmail(email)
    {
        const userRes = await this.collection.findOne({ email: email });
        return userRes;
    }
    async findByEmailPassword(email, password)
    {
        const userRes = await this.collection.findOne({ email: email });
        return userRes;
    }
}

module.exports = MDB_USERS;