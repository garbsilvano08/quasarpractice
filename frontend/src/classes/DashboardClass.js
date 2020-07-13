
import { postGetDevice, postGetDailyLog } from '../references/url';

// Globals
import methods from "../mixins/global_mixins";
const globals = methods.methods;

export default class DashboardClass
{
    constructor(data = {})
    {
        this.daily_logs = {}
    }

    async getTotalScannedToday()
    {
        let data = await globals.$_post(postGetDailyLog, {date_string: new Date().toISOString().split('T')[0], company_id: 'global'});
        console.log(data);
    }

    getHighestTempToday()
    {

    }

    getTotalAlertsToday()
    {

    }

    getCasesCOnfirmed()
    {

    }
}