const MDB_PERSON_LOGS       = require('../models/MDB_PERSON_LOGS');

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

module.exports = class Dashboard
{
    constructor()
    {
        // this.company_to_update = ['global']
        // this.company_id = '5f05fec1a3ed7128705f680e'
    }

    async getTraffic(params = {})
    {
        return await new MDB_PERSON_LOGS().collection.find(params)
    }

}