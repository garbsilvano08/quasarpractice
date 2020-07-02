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
            
            case 'Postal ID':
                return this.getPostalIDInfo(image_text);
            
            case 'PIC':
                return this.getPICInfo(image_text);
        }
    }
    getPICInfo(image)
    {
        if (image.length == 5)
        {
            this.id_info.last_name = image[2].lines.length === 2 ? image[2].lines[0].words[0].text : image[2].lines[1].words[0].text
            this.id_info.given_name = image[2].lines.length === 2 ? image[2].lines[1].words[0].text : image[2].lines[1].words[0].text
            this.id_info.middle_name = image[3].lines[0].words.length > 1 ? image[3].lines[0].words[image[3].lines[0].words.length - 1].text : image[3].lines[0].words[0].text
            this.id_info.id_num = image[3].lines[1].words.length > 1 ? image[3].lines[1].words[image[3].lines[2].words.length - 1].text : image[3].lines[1].words[0].text
            this.id_info.birthday = image.length == 5 ? image[4].lines[0].words[0].text : ''
            this.id_info.gender = 'Male'
            this.id_info.address = ''
            
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

    getPostalIDInfo(image)
    {
        console.log(image);
        if (image.length == 5 || image.length == 4)
        {
            // this.id_info.last_name = image[0].lines[5].words[0]
            // this.id_info.given_name = this.id_info.given_name +image[0].lines[5].words[]
            this.id_info.middle_name = ''
            this.id_info.id_num = ''
            this.id_info.birthday = ''
            this.id_info.gender = 'Male'
            this.id_info.address = ''
            
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

    getDriversLicenseInfo(image)
    {
        if (image.length == 4)
        {
            this.id_info.last_name = image[0].lines[5].words[0].text
            for (let index = 1; index < image[0].lines[5].words.length - 1; index++) {
                this.id_info.given_name = this.id_info.given_name + image[0].lines[5].words[index].text + " "    
            }
            this.id_info.middle_name = image[0].lines[5].words[image[0].lines[5].words.length -1].text
            this.id_info.id_num = ''
            
            this.id_info.birthday = image[0].lines[9].words.length == 2 ? image[0].lines[9].words[1].text : image[0].lines[10].words[1].text
            this.id_info.gender = image[0].lines[9].words.length == 2 ? image[0].lines[9].words[0].text : image[0].lines[10].words[0].text
            this.id_info.gender = this.id_info.gender.startsWith('M') ? 'Male' : 'Female'

            this.id_info.nationality = image[0].lines[10].words.length == 2 ? image[0].lines[9].words[0].text : image[0].lines[10].words[0].text
            // let street = image[0].lines[13].words.length == 2 ? image[0].lines[12].words[0] : image[0].lines[12].words[0]
            // let street = image[0].lines[10].words.length == 2 ? image[0].lines[12].words[0]
            for (let address = 12; address < image[0].lines.length; address++) {
                if (image[0].lines[address].words.length > 4)
                {
                    for (let word of image[0].lines[address].words) {
                        this.id_info.address = this.id_info.address + word.text + " "
                    }
                    if ((address + 1) <= image[0].lines.length - 1 && image[0].lines[address + 1].words < 3)
                    {
                        for (let town of image[0].lines[address + 1].words) {
                            this.id_info.address = this.id_info.address + town.text + " "
                        }
                    }
                }
                // const element = array[index];
            }
            
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
        try
        {
            this.getIDInformation(type, image_data.data.regions)
        }
        catch(e)
        {
            Notify.create({
                color: 'red',
                message: 'Please try again'
            }); 
        }
                
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