const MDB_COUNT_DAILY       = require('../models/MDB_COUNT_DAILY');
const MDB_COUNT_MONTHLY     = require('../models/MDB_COUNT_MONTHLY');
const MDB_COUNT_OVERALL     = require('../models/MDB_COUNT_OVERALL');
const CounterClass          = require('../classess/CounterClass');

module.exports =
{
    async counterLogs(req, res)
    {
        await new CounterClass().counterActivities()
        // await MDB_COUNT_OVERALL.update({company_id: req.body.company_id}, 
        // {
        //     key: req.body.key,
        //     $inc: {count: 1}
        // })
    }
}