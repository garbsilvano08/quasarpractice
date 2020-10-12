

export default class PersonalInformation
{
    constructor(data = {})
    {
        this.person_img = data.hasOwnProperty('person_img') ? data.person_img : '';
        this.id_image = data.hasOwnProperty('id_image') ? data.id_image : '';
        this.last_name = data.hasOwnProperty('last_name') ? data.last_name : '';
        this.middle_name = data.hasOwnProperty('middle_name') ? data.middle_name : '';
        this.given_name = data.hasOwnProperty('given_name') ? data.given_name : '';
        this.id_number = data.hasOwnProperty('id_number') ? data.id_number : '';
        this.id_type = data.hasOwnProperty('id_type') ? data.id_type : 'Drivers License'
        this.gender = data.hasOwnProperty('gender') ? data.gender : 'Male';
        this.birthday = data.hasOwnProperty('birthday') ? data.birthday : '';
        this.nationality = data.hasOwnProperty('nationality') ? data.nationality : '';
        this.home_address = data.hasOwnProperty('home_address') ? data.home_address : '';
        this.contact_number = data.hasOwnProperty('contact_number') ? data.contact_number : '';
        this.emergency_contact = data.hasOwnProperty('emergency_contact') ? data.emergency_contact : '';
        this.company_name = data.hasOwnProperty('company_name') ? data.company_name : '';
        this.temperature = data.hasOwnProperty('temperature') ? data.temperature : '';
        this.id_image = data.hasOwnProperty('id_image') ? data.id_image : '';

    }
    async submit()
    {

        console.log(this.convertObject());
        
        // console.log(data, 'data');
    }
    convertObject()
    {
        return Object.assign({}, this);
    }
}