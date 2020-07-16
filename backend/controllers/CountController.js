const MDB_COUNT_DAILY       = require('../models/MDB_COUNT_DAILY');
const MDB_COUNT_MONTHLY     = require('../models/MDB_COUNT_MONTHLY');
const MDB_COUNT_OVERALL     = require('../models/MDB_COUNT_OVERALL');
const MDB_PERSON_LOGS       = require('../models/MDB_PERSON_LOGS');
const MDB_LOGS              = require('../models/MDB_LOGS');
const MDB_PURPOSE           = require('../models/MDB_PURPOSE');

const CounterClass          = require('../classess/CounterClass');
const { get } = require('mongoose');
const { getPerson } = require('./MemberController');

const day_list = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']

module.exports =
{
    async getAllLogs(req, res)
    {   
        res.send(await new MDB_LOGS().collection.find(req.body.find_by).limit(req.body.limit).sort(req.body.sort_by))
    },

    async getLatestLog(req, res)
    {
        res.send(await new MDB_PERSON_LOGS().collection.find(req.body.find_by).limit(req.body.limit).sort(req.body.sort_by))
    },

    async getPersonLogs(req, res)
    {
        res.send(await new MDB_PERSON_LOGS().collection.find(req.body.find_by_category).sort({ date_saved: -1 }).limit(req.body.limit));
    },

    async counterLogs(req, res)
    {
        let date_string = new Date().toISOString().split('T')[0]
        let key = 'Traffic'
        date_string = date_string.split('-')
        // await new CounterClass().counterActivities(key, date_string)
    },

    async getCountOverall(req, res)
    {
        return res.send(await new MDB_COUNT_OVERALL().docs(req.body.find_count));
    },
    
    async getCountDaily(req, res)
    {
        return res.send(await new MDB_COUNT_DAILY().docs(req.body.find_count));
    },

    async getCountMonthly(req, res)
    {
        return res.send(await new MDB_COUNT_MONTHLY().docs(req.body.find_count));
    },

    async getDailyPurposeVisit(req, res)
    {
        let purpose_info = {
            official_business: 0,
            collection_pickup: 0,
            delivery: 0,
            corporate_meeting: 0,
            client_customer: 0,
            guest: 0
        }
        let purpose_visit = await new MDB_PURPOSE().docs(req.body.find_all);
        'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'

        for (let purpose of purpose_visit) {
           if (purpose.visit_purpose == 'Official Business') purpose_info.official_business++
           else if (purpose.visit_purpose == 'Collection and Pickup') purpose_info.collection_pickup++
           else if (purpose.visit_purpose == 'Delivery') purpose_info.delivery++
           else if (purpose.visit_purpose == 'Corporate Meeting') purpose_info.corporate_meeting++
           else if (purpose.visit_purpose == 'Client/Customer') purpose_info.client_customer++
           else if (purpose.visit_purpose == 'Guest') purpose_info.guest++
        }
        res.send(purpose_info)
    },

    async getOneWeekTrafficCount(req, res)
    {
        let day_list = ['Sun','Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
        let date_string = new Date(req.body.find_count.date_string)
        date_string.setDate((date_string.getDate() + (day_list.length - date_string.getDay())))
        let weekly_count = {}
        for (let index = 0; index < 7; index++) {
            
            req.body.find_count.date_string = new Date(date_string).toISOString().split('T')[0]
            let daily_log = await new MDB_COUNT_DAILY().collection.find(req.body.find_count);
            
            if (day_list[date_string.getDay()] == 'Mon') weekly_count.Mon = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Tue') weekly_count.Tue = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Wed') weekly_count.Wed = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Thurs') weekly_count.Thurs = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Fri') weekly_count.Fri = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Sat') weekly_count.Sat = daily_log.length ? daily_log[0].count : 0
            else if (day_list[date_string.getDay()] == 'Sun') weekly_count.Sun = daily_log.length ? daily_log[0].count : 0
            // let daily_info = {
            //     day: day_list[date_string.getDay()],
            //     count: daily_log.length ? daily_log[0].count : 0
            // }
            // weekly_count.unshift(daily_info) 
            date_string.setDate(date_string.getDate() - 1)
            req.body.find_count.date_string = date_string.toISOString().split('T')[0]
            
        }
        return res.send(weekly_count)
    },
}