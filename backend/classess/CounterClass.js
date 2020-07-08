const MDB_COMPANIES     = require('../models/MDB_COMPANIES');
const MDB_COUNT_OVERALL = require('../models/MDB_COUNT_OVERALL');
const MDB_COUNT_DAILY   = require('../models/MDB_COUNT_DAILY')
const MDB_COUNT_MONTHLY = require('../models/MDB_COUNT_MONTHLY');

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

module.exports = class CounterClass
{
    constructor()
    {
        this.company_to_update = []
        this.company_id = '5f05fe99a3ed7128705f680d'
    }
    async getCompany(company_id)
    {
        let company_details = await new MDB_COMPANIES().doc(company_id)
        if (company_details.parent_id != 'No Parent')
        {
            this.company_to_update.push(company_details._id)
            this.getCompany(company_details.parent_id) 
        }
    }

    async counterActivities(key, date_string)
    {
        this.company_to_update.push(this.company_id)
        this.getCompany(this.company_id)

        for ( let company_id of this.company_to_update )
        {
            let company = await new MDB_COUNT_OVERALL().docs({company_id: company_id})
            if (company.length)await new MDB_COUNT_OVERALL().collection.where({company_id: company_id}).updateMany({$inc: {count: 1}, key: 'Traffic'})
            else await new MDB_COUNT_OVERALL().add({count: 1, key: 'Traffic', company_id: company_id})
             
        }
    }
}