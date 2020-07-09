const MDB_COUNT_DAILY       = require('../models/MDB_COUNT_DAILY');
const MDB_COUNT_MONTHLY     = require('../models/MDB_COUNT_MONTHLY');
const MDB_COUNT_OVERALL     = require('../models/MDB_COUNT_OVERALL');
const CounterClass          = require('../classess/CounterClass');

module.exports =
{
    async counterLogs(req, res)
    {
        let date_string = new Date().toISOString().split('T')[0]
        let key = 'Traffic'
        date_string = date_string.split('-')
        await new CounterClass().counterActivities(key, date_string)
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
}