const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    full_name:      { type: String, required:   true },
    email:          { type: String, required:   true },
    username:       { type: String, required:   true },
    password:       { type: String, required:   true },
    user_type:      { type: String, required:   true },
    user_picture:   { type: String, required:   true },
    company:        { type: Object, required:   true },
    date_created:   { type: Date  , required:   true },
    company_id:     { type: String, required:   true },
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
        return userRes ? userRes.toJSON() : null;
    }
    async findByEmailPassword(email, password)
    {
        console.log(email, password);
        const userRes = await this.collection.findOne({ email: email, password: password });
        return userRes ? userRes.toJSON() : null;
    }
}

module.exports = MDB_USERS;