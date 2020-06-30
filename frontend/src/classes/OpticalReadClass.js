import Tesseract from 'tesseract.js';
import axios from 'axios';

// var unirest = require("unirest");
// var req = unirest("POST", "https://microsoft-computer-vision3.p.rapidapi.com/ocr");

export default class OpticalReadClass
{
    constructor()
    {
        this.converted_image = []
        this.id_info = {
            given_name: ''
        }
    }

    getIDInformation(type, image_text)
    {
        switch (type)
        {
            case 'Drivers License':
                return this.getDriversLicenseInfo(image_text);
            
            case 'UMID':
                return this.getUmidInfo(image_text);
            
            case 'Philhealth ID':
                return this.payViaPaypal();
        }
    }
    getUmidInfo(image)
    {
        
        // let person_info = {}
        // person_info.name = image[5] + "," + " " + image[8] + " " + image[11]
        // let address = image[14] + " " + image[15] + " " + image[16] + " " + image[17]
        // person_info.address = address.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        // let other_data = (image[12].replace(/[^a-zA-Z0-9]/g, ' ')).split(" ");
        // let data = image[10].split(" ")
        // person_info.birthdate = other_data[7] + "-" + other_data[8] + "-" + other_data[9] 
        // person_info.gender = other_data[6].startsWith('F') ? 'Female' : 'Male'
        // person_info.id_num = image[4]
        // return person_info
    }

    getDriversLicenseInfo(image)
    {
        this.id_info.last_name = image[2].lines[0].words[0].text
        for (let index = 1; index < image[2].lines[0].words.length - 1; index++) {
            this.id_info.given_name = this.id_info.given_name + image[2].lines[0].words[index].text + " "
        }
        this.id_info.last_name = image[2].lines[0].words[0].text
        this.id_info.middle_name = image[2].lines[0].words[image[2].lines[0].words.length - 1].text
        this.id_info.gender = image[2].lines[4].words[1].text.startsWith('F') ? 'Female' : 'Male'
        this.id_info.birthday = image[2].lines[4].words[0].text
        this.id_info.nationality = image[2].lines[5].words[0].text
        console.log(image, this.id_info);

        // person_info.address = image[8]
        // let person_info = {}
        
        // let data = image[10].split(" ")
        // let id_num = image[14].split(" ")
        // let date = data[0].split('')
        // person_info.birthdate = date[0] + date[1] + date[2] + date[3] + "-" + date[4] + date[5] + "-" + date[6] + date[7]
        // person_info.gender = data[1] == 'F' ? 'Female' : 'Male'
        // person_info.id_num = id_num[1]
        
        // return person_info
        
        
    }
    async ocrUnirest(type, id_url)
    {
        let headers = {
                "x-rapidapi-host": "microsoft-computer-vision3.p.rapidapi.com",
                "x-rapidapi-key": "544923b26amshec5ca6704bc931fp162b1fjsn122be4275c14",
                "content-type": "application/json",
                "accept": "application/json",
                "useQueryString": true
        }
        let image_data = await axios.post('https://microsoft-computer-vision3.p.rapidapi.com/ocr', {url: id_url}, {
            headers: headers
        })
        this.getIDInformation(type, image_data.data.regions)
                
    }

    checkImage(type, id_url)
    {
        console.log(this.converted_image, 'image');
        
        this.getIDInformation(type, this.converted_image)
        // Tesseract.recognize(
        // id_url,
        // 'eng',
        // { logger: m => console.log(m) }
        // ).then(async({ data: { text } })  => {
        //     console.log(text, 'text');
            
        //     this.id_info = await this.getIDInformation(type, text.split("\n"))
        // })
    }
}