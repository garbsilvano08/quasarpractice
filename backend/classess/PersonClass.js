const MDB_COMPANIES     = require('../models/MDB_COMPANIES');
const MDB_PERSON     = require('../models/MDB_PERSON');
const MDB_IDENTIFICATION = require('../models/MDB_IDENTIFICATION');
const MDB_PURPOSE   = require('../models/MDB_PURPOSE')

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

module.exports = class PersonClass
{
    constructor()
    {
        
    }

    async submit(person, company_id)
    {
        let already_existed = await new MDB_PERSON().docs({contact_number:  person.person_info.contact_number, birthday: person.person_info.birthday});
        
        if (already_existed.length)
        {
            if (already_existed[0].category == 'Visitor' || already_existed[0].category == 'Report' )
            {
                await new MDB_PERSON().collection.where({contact_number: person.person_info.contact_number}).where({birthday: person.person_info.birthday}).updateMany(person.person_info)
                await this.updateOtherDetails(person, already_existed[0]._id, company_id)
            }
            else return false
        }
        else
        {
            let data = await new MDB_PERSON().add(person.person_info);
            if (person.person_info.category == 'Visitor' || person.person_info.category == 'Report') await this.updateOtherDetails(person, data._id, company_id)
        }

        if (person.person_info.category == 'Staff') await new MDB_COMPANIES().update(company_id, {$inc: {staff: 1}})
        return true
        
    }

    async updateOtherDetails(person, person_id, company_id)
    {
        let id_info = {
            person_id:  person_id,
            id_image:   person.person_info.id_img,
            id_number:  person.person_info.id_num,
            id_type:    person.person_info.id_type,
            date_saved: new Date()
        }

        // Purpose
        let purpose_visit = {
            person_id:          person_id,
            company_id:         company_id,
            visit_purpose:      person.person_info.visit_purpose,
            contact_person:     person.person_info.contact_person,
            destination:        person.person_info.destination,
            delivery_name:      person.person_info.delivery_name,
            date_saved:         new Date(),
            date_string:        person.person_info.date
        }
        await new MDB_IDENTIFICATION().add(id_info);
        if (person.person_info.category == 'Visitor') await new MDB_PURPOSE().add(purpose_visit);
    }
}