const MDB_COUNT_DAILY       = require('../models/MDB_COUNT_DAILY');
const MDB_COUNT_MONTHLY     = require('../models/MDB_COUNT_MONTHLY');
const MDB_COUNT_OVERALL     = require('../models/MDB_COUNT_OVERALL');
const MDB_PERSON_LOGS       = require('../models/MDB_PERSON_LOGS');
const MDB_LOGS              = require('../models/MDB_LOGS');
const MDB_PURPOSE           = require('../models/MDB_PURPOSE');

const CounterClass          = require('../classess/CounterClass');
const DashboardClass          = require('../classess/DashboardClass');
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
        res.send(await new MDB_PERSON_LOGS().collection.find(req.body.find_by_category).sort(req.body.sort).limit(req.body.limit));
    },

    async counterLogs(req, res)
    {
        let date_string = new Date().toISOString().split('T')[0]
        let key = 'Traffic'
        date_string = date_string.split('-')
        // await new CounterClass().counterActivities(key, date_string)
    },

    async footTraffic(req, res)
    {
        let options_people = ['All' , 'Staff', 'Visitors', 'Stranger'];

        let startDate = ''
        let endDate = ''
        let traffic_data = []
        console.log(req.body.filter.date_filter);
        for (let x = 0; x < options_people.length; x++) {
            let traffic = {}

            if (options_people[x] == req.body.filter.person)
            {
                if (req.body.filter.date_filter == 'Daily') 
                {
                    let date = new Date()
                    let params = {}
                    date = new Date(new Date(date.setHours(0,0,0,0)))
        
                    startDate = date
                    let transfer_date = startDate
                    for (let index = 0; index <= 23; index++) {
                        endDate = new Date(transfer_date.setHours(startDate.getHours(), 59, 59, 100))
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, date_saved: {'$gte' : startDate , '$lt' : endDate}}
                            else params = {date_saved: {'$gte' : startDate , '$lt' : endDate}}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id,category:options_people[x], date_saved: {'$gte' : startDate , '$lt' : endDate}}
                            else params = {category: options_people[x], date_saved: {'$gte' : startDate , '$lt' : endDate}}
                        }
                        let data = await new DashboardClass().getTraffic(params)
                        if (index < 12)traffic[index == 0 ? 12 + "AM" : index + "AM"] = data.length
                        else traffic[index == 12 ? 12 + "PM" : index - 12  + "PM"] = data.length
                        startDate = new Date(startDate.setHours(startDate.getHours() + 1,0,0))
                    }
                }
                else if (req.body.filter.date_filter == 'Weekly')
                {   
                    let day_list = ['Sun','Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
                    let date_string = new Date()
                    date_string.setDate((date_string.getDate() - date_string.getDay()))
                    let weekly_count = {}
                    for (let index = 0; index < 7; index++) {
                        
                        date_string = new Date(date_string).toISOString().split('T')[0]
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_name) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: date_string}
                            else params = {company_id: 'global',key: 'Traffic', date_string: date_string}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string:date_string}
                            params = {company_id: 'global', key: req.body.filter.person, date_string:date_string}

                        }
                        let weekly = await new MDB_COUNT_DAILY().collection.find(params);
                        
                        traffic[day_list[index]] = weekly.length ? weekly[0].count : 0
                        
                        date_string = new Date (date_string)
                        date_string.setDate(date_string.getDate() + 1)                        
                    }
                }
                else if (req.body.filter.date_filter == 'Monthly' )
                {
                    let date = new Date().setDate(1)
                    for (let index = 0; new Date(date).getMonth() <= new Date().getMonth(); index++) {
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_name) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                            else params = {company_id: 'global',key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string: new Date(date).toISOString().split('T')[0]}
                            params = {company_id: 'global', key: req.body.filter.person, date_string: new Date(date).toISOString().split('T')[0]}

                        }

                        let monthly = await new MDB_COUNT_DAILY().collection.find(params);
                        traffic[new Date(date).getDate()] = monthly.length ? monthly[0].count : 0
                        date = new Date().setDate(new Date(date).getDate() + 1)
                    }
                }
                else if (req.body.filter.date_filter == 'Yearly' )
                {
                    let date = new Date()
                    let month_list = ['Jan','Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

                    for (let index = 0; index < month_list.length; index++) {
                        // date_string = new Date(date_string).toISOString().split('T')[0]
                        date = new Date(date.setMonth(index))
                        let date_string = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0")

                        console.log(date_string, date);
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_name) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: date_string}
                            else params = {company_id: 'global',key: 'Traffic', date_string: date_string}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string:date_string}
                            params = {company_id: 'global', key: req.body.filter.person, date_string:date_string}

                        }
                        let yearly = await new MDB_COUNT_MONTHLY().collection.find(params);
                        
                        traffic[month_list[index]] = yearly.length ? yearly[0].count : 0
                        
                        date_string = new Date (date_string)
                        date_string.setDate(date_string.getDate() + 1)                        
                    }
                }
                else if (req.body.filter.date_filter == 'Custom Date' )
                {
                    // console.log(new Date(date) <= new Date(req.body.filter.end_date));
                    let date = new Date(req.body.filter.start_date)
                    let month_list = ['Jan','Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

                    for (let index = 0; new Date(date) <= new Date(req.body.filter.end_date); index++) {

                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_name) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                            else params = {company_id: 'global',key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string: new Date(date).toISOString().split('T')[0]}
                            params = {company_id: 'global', key: req.body.filter.person, date_string:new Date(date).toISOString().split('T')[0]}

                        }

                        let daily = await new MDB_COUNT_DAILY().collection.find(params);
                        traffic[ month_list[new Date(date).getMonth()] + " " + new Date(date).getDate()] = daily.length ? daily[0].count : 0
                        date = new Date(date).setDate(new Date(date).getDate() + 1)
                    }   
                }
            }
            console.log(traffic, options_people[x], 'traffic');
            traffic_data.push({name: options_people[x], data: traffic})
        }
        res.send(traffic_data)
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