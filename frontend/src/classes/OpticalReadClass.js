import Tesseract from 'tesseract.js';
export default class OpticalReadClass
{
    constructor()
    {
        this.id_info = {}
    }

    async getIDInformation(type, image_text)
    {
        switch (type)
        {
            case 'Drivers License':
                return await this.getDriversLicenseInfo(image_text);
            
            case 'Umid ID':
                return await this.getUmidInfo(image_text);
            
            case 'Philhealth ID':
                return await this.payViaPaypal();

            default:
                return await this.payViaDragonpay();
        }
    }
    getUmidInfo(image)
    {
        let person_info = {}
        person_info.name = image[5] + "," + " " + image[8] + " " + image[11]
        let address = image[14] + " " + image[15] + " " + image[16] + " " + image[17]
        person_info.address = address.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        let other_data = (image[12].replace(/[^a-zA-Z0-9]/g, ' ')).split(" ");
        let data = image[10].split(" ")
        person_info.birthdate = other_data[7] + "-" + other_data[8] + "-" + other_data[9] 
        person_info.gender = other_data[6].startsWith('F') ? 'Female' : 'Male'
        person_info.id_num = image[4]
        return person_info
    }

    getDriversLicenseInfo(image)
    {
        let person_info = {}
        person_info.name = image[6]
        person_info.address = image[8]
        
        let data = image[10].split(" ")
        let id_num = image[14].split(" ")
        let date = data[0].split('')
        person_info.birthdate = date[0] + date[1] + date[2] + date[3] + "-" + date[4] + date[5] + "-" + date[6] + date[7]
        person_info.gender = data[1] == 'F' ? 'Female' : 'Male'
        person_info.id_num = id_num[1]
        
        return person_info
    }

    checkImage(type, id_url)
    {
        Tesseract.recognize(
        id_url,
        'eng',
        { logger: m => console.log(m) }
        ).then(async({ data: { text } })  => {
            console.log(text, 'text');
            
            this.id_info = await this.getIDInformation(type, text.split("\n"))
        })
    }
}