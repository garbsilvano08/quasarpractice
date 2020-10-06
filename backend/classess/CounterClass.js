const MDB_COMPANIES     = require('../models/MDB_COMPANIES');
const MDB_COUNT_OVERALL = require('../models/MDB_COUNT_OVERALL');
const MDB_COUNT_DAILY   = require('../models/MDB_COUNT_DAILY')
const MDB_COUNT_MONTHLY = require('../models/MDB_COUNT_MONTHLY');
const MDB_DEVICE        = require('../models/MDB_DEVICE');


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
        if (!company_details || company_details.parent_id != 'No Parent')
        {
            await this.getCompany(company_details.parent_id) 
        }
    }

    async saveCount(company_id, category, date_string)
    {
        //Overall counter
        let count_overall = await new MDB_COUNT_OVERALL().docs({company_id: company_id, key: category})
        if (count_overall.length) await new MDB_COUNT_OVERALL().collection.where({company_id: company_id}).where({key: category}).updateMany({$inc: {count: 1}})
        else await new MDB_COUNT_OVERALL().add({count: 1, key: category, company_id: company_id})
            
        //Daily counter
        let count_daily = await new MDB_COUNT_DAILY().docs({company_id: company_id, key: category, date_string: date_string[0] + "-" + date_string[1] + "-" + date_string[2]})
        if (count_daily.length) await new MDB_COUNT_DAILY().collection.where({company_id: company_id}).where({key: category}).updateMany({$inc: {count: 1}})
        else await new MDB_COUNT_DAILY().add({count: 1, key: category, company_id: company_id, date_string: date_string[0] + "-" + date_string[1] + "-" + date_string[2] })

        //Monthly counter
        let count_monthly = await new MDB_COUNT_MONTHLY().docs({company_id: company_id, key: category, date_string: date_string[0] + "-" + date_string[1]})
        if (count_monthly.length) await new MDB_COUNT_MONTHLY().collection.where({company_id: company_id}).where({key: category}).updateMany({$inc: {count: 1}})
        else await new MDB_COUNT_MONTHLY().add({count: 1, key: category, company_id: company_id, date_string: date_string[0] + "-" + date_string[1]})
        return
    }

    async counterActivities(company_id, key, date_string, device_id)
    {
        await this.getCompany(company_id)
        for ( let company of this.company_to_update )
        {
            for(let category of key)
            {
                if (category) await this.saveCount(company, category, date_string)
            }
        }
        await new MDB_DEVICE().collection.where({device_id: device_id}).updateMany({$inc: {count_logs: 1}})
    }
    
}