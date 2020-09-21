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
const current_date = new Date()

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

    async countLogs(req, res)
    {
        let count = {}
        count.count = await new MDB_PERSON_LOGS().collection.countDocuments(req.body.find_by_category)
        res.send(count)
    },

    async getPersonLogs(req, res)
    {
        // console.log(req.body); 
        if (req.body.skip) 
        {
            let data = await new MDB_PERSON_LOGS().collection.find(req.body.find_by_category).skip(req.body.skip).sort(req.body.sort).limit(req.body.limit)
            // console.log(data);
            
            res.send(data);
        }
        else res.send(await new MDB_PERSON_LOGS().collection.find(req.body.find_by_category).sort(req.body.sort).limit(req.body.limit));
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
        let options_people = ['All' , 'Staff', 'Visitor', 'Stranger'];

        let startDate = ''
        let endDate = ''
        let traffic_data = []
        for (let x = 0; x < options_people.length; x++) {
            let traffic = {}

            if (options_people[x] == req.body.filter.person)
            {
                if (req.body.filter.date_filter == 'Today') 
                {
                    let params = {}
                    let date = new Date()
                    // date.setHours(date.getHours() + 8)
                    date.setHours(0,0,0,0)
                    let end = new Date()
                    // end.setHours(end.getHours() + 8)
                    end.setHours(0,59,59,999)
                    startDate = date
                    endDate = end
                    for (let index = 0; index <= 23; index++) {
                        // console.log(startDate, endDate);
                        // let transfer_date = startDate
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, date_saved: {'$gt' : new Date(startDate) , '$lte' : new Date(endDate)}}
                            else params = {date_saved: {'$gt' : new Date(startDate) , '$lte' : new Date(endDate)}}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id,category:options_people[x], date_saved: {'$gt' : new Date(startDate) , '$lte' : new Date(endDate)}}
                            else params = {category: options_people[x], date_saved: {'$gt' : new Date(startDate) , '$lte' : new Date(endDate)}}
                        }
                        // let data = await new DashboardClass().getTraffic(params)
                        let data = await new MDB_PERSON_LOGS().collection.countDocuments(params)
                        if (startDate.getHours() < 12)traffic[startDate.getHours() == 0 ? 12 + "AM" : index + "AM"] = data
                        else traffic[startDate.getHours() == 12 ? 12 + "PM" : index - 12  + "PM"] = data
                        startDate.setHours(startDate.getHours() + 1,0,0)
                        endDate.setHours(endDate.getHours() + 1,59,59,999)
                    }
                }
                else if (req.body.filter.date_filter == 'Daily')
                {   
                    let day_list = ['Sun','Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
                    let date_string = new Date()
                    date_string.setDate((date_string.getDate() - date_string.getDay()))
                    
                    let date = new Date(date_string)
                    date.setHours(0,0,0,0)
                    let end = new Date(date_string).setDate(new Date(date_string).getDate() + 1)
                    end = new Date(end).setHours(0,0,0,0)
                    startDate = date
                    endDate = new Date(end)
                    
                    for (let index = 0; index < 7; index++) {
                        // console.log(startDate, endDate);
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                            else params = {date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id,category:options_people[x], date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                            else params = {category: options_people[x], date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                        }
                        
                        // date_string = new Date(date_string).toISOString().split('T')[0]
                        // if (req.body.filter.person === 'All'){
                        //     if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: date_string}
                        //     else params = {company_id: 'global',key: 'Traffic', date_string: date_string}
                        // }
                        // else {
                        //     if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string:date_string}
                        //     params = {company_id: 'global', key: req.body.filter.person, date_string:date_string}

                        // }
                        let weekly = await new MDB_PERSON_LOGS().collection.countDocuments(params)
                        
                        // traffic[day_list[index]] = weekly.length ? weekly[0].count : 0
                        traffic[day_list[index]] = weekly
                        
                        startDate.setDate(startDate.getDate() + 1)
                        endDate.setDate(startDate.getDate() + 1)                   
                    }
                }
                else if (req.body.filter.date_filter == 'Weekly' )
                {
                    let date_string = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2, "0") + "-01";
                    let date = new Date(date_string)
                    // date.setHours(0,0,0,0)
                    // let end = new Date(date)
                    end = new Date(date_string).setDate(new Date(date_string).getDate() + 1)
                    startDate = date
                    endDate = new Date(end)
                    // console.log(startDate, endDate, 'Monthly');
                    for (let index = 0; new Date(date).getMonth() <= new Date().getMonth(); index++) {
                         if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                            else params = {date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id,category:options_people[x], date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                            else params = {category: options_people[x], date_saved: {'$gte' : new Date(startDate) , '$lt' : new Date(endDate)}}
                        }
                        // if (req.body.filter.person === 'All'){
                        //     if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                        //     else params = {company_id: 'global',key: 'Traffic', date_string: new Date(date).toISOString().split('T')[0]}
                        // }
                        // else {
                        //     if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: req.body.filter.person, date_string: new Date(date).toISOString().split('T')[0]}
                        //     params = {company_id: 'global', key: req.body.filter.person, date_string: new Date(date).toISOString().split('T')[0]}

                        // }

                        // let monthly = await new MDB_COUNT_DAILY().collection.find(params);
                        // traffic[new Date(date).getDate()] = monthly.length ? monthly[0].count : 0
                        let monthly = await new MDB_PERSON_LOGS().collection.countDocuments(params)
                        traffic[new Date(date).getDate()] = monthly

                        // date = new Date().setDate(new Date(date).getDate() + 1)
                        startDate.setDate(startDate.getDate() + 1)
                        endDate.setDate(startDate.getDate() + 1)       
                    }
                }
                else if (req.body.filter.date_filter == 'Monthly' )
                {
                    let date = new Date()
                    let month_list = ['Jan','Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

                    for (let index = 0; index < month_list.length; index++) {
                        // date_string = new Date(date_string).toISOString().split('T')[0]
                        date = new Date(date.setMonth(index))
                        let date_string = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0")

                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, key: 'Traffic', date_string: date_string}
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
                else  // if (req.body.filter.date_filter == 'Custom Date' )
                {   
                    let date = new Date(req.body.filter.start_date)
                    let month_list = ['Jan','Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                    // console.log(date, req.body.filter);
                    // let date_string = new Date().setDate(1)
                    // let date = new Date(date_string)
                    // end = new Date(end).setDate(new Date(end).getDate() + 1)
                    // date.setHours(0,0,0,0)
                    let end = new Date(req.body.filter.start_date)
                    // end = new Date(end).setDate(new Date(end).getDate() + 1)
                    end = new Date(end).setHours(31,59,59,999)
                    startDate = new Date(date)
                    endDate = new Date(end)

                    for (let index = 0; new Date(startDate) <= new Date(req.body.filter.end_date).setHours(23,59,59,999); index++) {
                        if (req.body.filter.person === 'All'){
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id, date_saved: {'$gte' : new Date(startDate) , '$lte' : new Date(endDate)}}
                            else params = {date_saved: {'$gte' : new Date(startDate) , '$lte' : new Date(endDate)}}
                        }
                        else {
                            if (req.body.filter.company_id) params = {company_id: req.body.filter.company_id,category: req.body.filter.person, date_saved: {'$gte' : new Date(startDate) , '$lte' : new Date(endDate)}}
                            else params = {category: req.body.filter.person, date_saved: {'$gte' : new Date(startDate) , '$lte' : new Date(endDate)}}
                        }
                        
                        let daily = await new MDB_PERSON_LOGS().collection.countDocuments(params)
                        // traffic[month_list[new Date(date).getMonth()] + " " + new Date(date).getDate()] = daily.length ? daily[0].count : 0
                        traffic[month_list[new Date(startDate).getMonth()] + " " + new Date(startDate).getDate()] = daily
                        // date = new Date(date).setDate(new Date(date).getDate() + 1)
                        startDate.setDate(startDate.getDate() + 1)
                        endDate.setDate(endDate.getDate() + 1) 
                    }   
                }
                traffic_data.push({name: options_people[x], data: traffic})
            }
        }
        // console.log(traffic_data,'data');
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