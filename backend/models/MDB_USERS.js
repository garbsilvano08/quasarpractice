const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcryptjs');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    fullname : {
        type:       String,
        required:   true
    },
    username: {
        type:       String,
        required:   true
    },
    password: {
        type:       String,
        required:   true
    },
   /* user : {
        type:       String,
        required:   true
    },
    password: {
        type:       String,
        required:   true
    },
    firstname: {
        type:       String,
        required:   true
    },*/
    /*lastname: {
        type:       String,
        required:   true
    },
    email: {
        type:       String,
        default:    '',
    },
    contact: {
        type:       String,
        default:    '',
    },
    security_answer: {
        type:       String,
        required:   true
    },
    date_created: {
        type:       Date,
        required:   true
    }*/
});

class MDB_USERS extends MODEL {
    constructor () {
        super('users',schema);
    }
    
    async find({username, password}){
    const UserDetailsModel = this.Model;

    const userRes = await UserDetailsModel.findOne({username});
    console.log(userRes);
    if(userRes === null) {return ('No user found!'); return userRes;};

    const passRes = await UserDetailsModel.findOne({password});
    if(passRes === null) {return ('Invalid username/password'); return passRes;};

    let token = jwt.sign(userRes.toJSON(), 'lexicon', {expiresIn: '1h'})
    return ('Welcome, ' + token);
    }
}

module.exports = MDB_USERS;