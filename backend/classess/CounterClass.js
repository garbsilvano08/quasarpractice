const MDB_COMPANIES = require('../models/MDB_COMPANIES');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

module.exports = class CounterClass
{
    constructor()
    {
        this.company_to_update
        this.company_id = '5f05db06e58ab828e0450022'
    }
    async getCompany(company_id)
    {
        console.log(company_id);
        let company_details = await new MDB_COMPANIES().doc(company_id)
        console.log(company_details);
        
        // if (company_details.parent_id == 'No Parent')
        // {
        //     console.log('Done');
        // }
        // else
        // {
        //     this.getCompany(company_details.parent_id) 
        // }
    }

    async counterActivities(key, date_string)
    {
        this.getCompany(this.company_id)
    }
}