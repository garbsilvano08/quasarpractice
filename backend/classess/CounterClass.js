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
        this.company_to_update = ['global']
        this.company_id = '5f05fec1a3ed7128705f680e'
    }
    async getCompany(company_id)
    {
        this.company_to_update.push(company_id)
        let company_details = await new MDB_COMPANIES().doc(company_id)
        if (company_details.parent_id != 'No Parent')
        {
            await this.getCompany(company_details.parent_id) 
        }
    }

    async saveCount(company_id, category, date_string)
    {
        // console.log('checking');
            //Overall counter
            let count_overall = await new MDB_COUNT_OVERALL().docs({company_id: company_id, key: category})
            // console.log(count_overall.length);
            if (count_overall.length) await new MDB_COUNT_OVERALL().collection.where({company_id: company_id}).updateMany({$inc: {count: 1}})
            else await new MDB_COUNT_OVERALL().add({count: 1, key: category, company_id: company_id})
                
            //Daily counter
            let count_daily = await new MDB_COUNT_DAILY().docs({company_id: company_id, key: category, date_string: date_string[0] + "-" + date_string[1] + "-" + date_string[2]})
            // console.log(count_daily.length);
            if (count_daily.length) await new MDB_COUNT_DAILY().collection.where({company_id: company_id}).updateMany({$inc: {count: 1}})
            else await new MDB_COUNT_DAILY().add({count: 1, key: category, company_id: company_id, date_string: date_string[0] + "-" + date_string[1] + "-" + date_string[2] })

            //Monthly counter
            let count_monthly = await new MDB_COUNT_MONTHLY().docs({company_id: company_id, key: category, date_string: date_string[0] + "-" + date_string[1]})
            // console.log(count_monthly.length);
            if (count_monthly.length) await new MDB_COUNT_MONTHLY().collection.where({company_id: company_id}).updateMany({$inc: {count: 1}})
            else await new MDB_COUNT_MONTHLY().add({count: 1, key: category, company_id: company_id, date_string: date_string[0] + "-" + date_string[1]})
        return
    }

    async counterActivities(company_id, key, date_string)
    {
        await this.getCompany(company_id)
        // console.log(this.company_to_update, key, 'checking');
        // console.log(this.company_to_update);
        for ( let company of this.company_to_update )
        {
            await this.saveCount(company, 'Traffic', date_string)
            if (key) await this.saveCount(company, key, date_string)
        
        }
    }
    
}