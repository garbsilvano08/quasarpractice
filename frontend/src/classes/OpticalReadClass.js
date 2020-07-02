import Tesseract from 'tesseract.js';
import axios from 'axios';
import { Notify } from 'quasar';

// var unirest = require("unirest");
// var req = unirest("POST", "https://microsoft-computer-vision3.p.rapidapi.com/ocr");

export default class OpticalReadClass
{
    constructor()
    {
        this.id_words = []
        this.converted_image = []
        this.id_info = {
            address: '',
            last_name: '',
            given_name: '',
            middle_name: '',
            gender: 'Male',
            birthday: '',
            nationality: '',
            id_num: '',
            contact_num: '',
            emergency_num: ''
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
            
            case 'PIC':
                return this.getPICInfo(image_text);

            case 'Philhealth ID':
                return this.payViaPaypal();
        }
    }
    getPICInfo(image)
    {

        console.log(image, 'kjhkjhjkhjkh');
        if (image.length == 5)
        {
            this.id_info.last_name = image[2].lines.length === 2 ? image[2].lines[0].words[0].text : image[2].lines[1].words[0].text
            this.id_info.given_name = image[2].lines.length === 2 ? image[2].lines[1].words[0].text : image[2].lines[1].words[0].text
            this.id_info.middle_name = image[3].lines[0].words.length > 1 ? image[3].lines[0].words[image[3].lines[0].words.length - 1].text : image[3].lines[0].words[0].text
            this.id_info.id_num = image[3].lines[1].words.length > 1 ? image[3].lines[1].words[image[3].lines[2].words.length - 1].text : image[3].lines[1].words[0].text
            this.id_info.birthday = image.length == 5 ? image[4].lines[0].words[0].text : ''
            this.id_info.gender = 'Male'
            this.id_info.address = ''

            console.log();
            
            
            Notify.create({
                color: 'green',
                message: 'Successful'
            }); 
        }
        else
        {
            Notify.create({
                color: 'red',
                message: 'Please try again'
            }); 
        }
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

    getUmidInfo(image)
    {

        console.log(image);
        
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
        for (let x = 0; x < image[2].lines[2].words.length; x++) {
            this.id_info.address = this.id_info.address + image[2].lines[2].words[x].text + " "
        }
        this.id_info.last_name = image[2].lines[0].words[0].text
        this.id_info.middle_name = image[2].lines[0].words[image[2].lines[0].words.length - 1].text
        this.id_info.gender = image[2].lines[4].words[1].text.startsWith('F') ? 'Female' : 'Male'
        this.id_info.birthday = image[2].lines[4].words[0].text
        this.id_info.nationality = image[2].lines[5].words[0].text        
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
        // this.checkImage(image_data.data.regions)
        this.getIDInformation(type, image_data.data.regions)
                
    }

    checkImage(image)
    {
        Notify.create({
            color: 'red',
            message: ';lkjlkjhkhkjgjtiyjbjk'
        }); 
        console.log(image, 'image');
        for (let data of image) {
            for (let line of data.lines) {
                for (let word of line.words) {
                    this.id_words.push(word.text)
                }
                
            }
        }

        console.log(this.id_words, 'words');
        
    }
}