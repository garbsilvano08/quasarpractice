const MDB_COUNT_DAILY       = require('../models/MDB_COUNT_DAILY');
const MDB_COUNT_MONTHLY     = require('../models/MDB_COUNT_MONTHLY');
const MDB_COUNT_OVERALL     = require('../models/MDB_COUNT_OVERALL');
const CounterClass          = require('../classess/CounterClass');

module.exports =
{
    async counterLogs(req, res)
    {
        let date_string = new Date().toISOString().split('T')[0]
        date_string = date_string.split('-')
        await new CounterClass().counterActivities('Traffic', date_string)
    }
}