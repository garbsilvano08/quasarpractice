const MDB_PERSON_LOGS       = require('../models/MDB_PERSON_LOGS');
const MDB_PERSON            = require('../models/MDB_PERSON');

module.exports = class PersonLogsClass
{
    constructor(data = {})
    {
        this.mask                   = data.hasOwnProperty('mask') ? data.mask : '';
        this.temperature            = data.hasOwnProperty('temperature') ? data.temperature : '';

        this.person_id              = data.hasOwnProperty('person_id') ? data.person_id : '';      
        this.person_img             = data.hasOwnProperty('person_img') ? data.person_img : '';
        this.full_name              = data.hasOwnProperty('full_name') ? data.full_name : '';

        this.company_id             = data.hasOwnProperty('company_id') ? data.company_id : '';
        this.company_name           = data.hasOwnProperty('company_name') ? data.company_name : ''; 
        this.device_id              = data.hasOwnProperty('device_id') ? data.device_id : '';;
        this.frontdesk_person_id    = data.hasOwnProperty('frontdesk_person_id') ? data.frontdesk_person_id : '';;
        
        this.category               = data.hasOwnProperty('category') ? data.category : '';
        this.date_logged            = data.hasOwnProperty('date_logged') ? new Date(data.date_logged).toISOString().split('T')[0] : ''; 
        this.date_saved             = new Date(data.date_logged); 
    }

    async submit()
    {
        if (this.frontdesk_person_id.length < 9)
        {
            for (let index = 0; index <= (9 - this.frontdesk_person_id.length); index++) {
                this.frontdesk_person_id = '0' + this.frontdesk_person_id
            }
        }
        console.log(this.frontdesk_person_id, 'person');
        let person_details = await new MDB_PERSON().docs({frontdesk_person_id: this.frontdesk_person_id})
        this.category  = person_details[0].category
        this.person_id = person_details[0]._id

        let person_logs = await new MDB_PERSON_LOGS().docs({person_id: this.person_id, date_logged: this.date_logged})
        if (person_logs.length) await new MDB_PERSON_LOGS().update(person_logs[0]._id ,this.convertObject())
        else await new MDB_PERSON_LOGS().add(this.convertObject())
    }

    convertObject()
    {
        return Object.assign({}, this);
    }
}