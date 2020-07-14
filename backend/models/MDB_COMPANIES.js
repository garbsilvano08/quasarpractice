const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema(
{
    // company_info: { type: Object, required: true }
    company_name:    { type: String  , required:   true },
    company_location:    { type: String  , required:   true },
    company_type:    { type: String  , required:   true },
    company_logo_url:    { type: String  , required:   true },
    parent_id:    { type: String  , required:   true },
    subcompanies: { type: Array , required: true},
    staff: {type: Number , required: true , default: 0}
    
});

class MDB_COMPANIES extends MODEL
{
    constructor()
    {
        super('companies', schema);
    }
}

module.exports = MDB_COMPANIES;