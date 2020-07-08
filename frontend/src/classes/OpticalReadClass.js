import Tesseract from 'tesseract.js';
import axios from 'axios';
import { Notify } from 'quasar';
import { postAddBlacklist } from '../references/url';

// Globals
import methods from "../mixins/global_mixins";
const globals = methods.methods;

// var unirest = require("unirest");
// var req = unirest("POST", "https://microsoft-computer-vision3.p.rapidapi.com/ocr");

export default class OpticalReadClass
{
    constructor(data = {})
    {
        this.account_img = data.hasOwnProperty('account_img') ? data.account_img : '';
        this.id_img = data.hasOwnProperty('id_img') ? data.id_img : '';
        this.last_name = data.hasOwnProperty('last_name') ? data.last_name : '';
        this.middle_name = data.hasOwnProperty('middle_name') ? data.middle_name : '';
        this.given_name = data.hasOwnProperty('given_name') ? data.given_name : '';
        this.id_num = data.hasOwnProperty('id_num') ? data.id_num : '';
        this.id_type = data.hasOwnProperty('id_type') ? data.id_type : 'Drivers License'
        this.gender = data.hasOwnProperty('gender') ? data.gender : 'Male';
        this.birthday = data.hasOwnProperty('birthday') ? data.birthday : '';
        this.nationality = data.hasOwnProperty('nationality') ? data.nationality : '';
        this.home_address = data.hasOwnProperty('home_address') ? data.home_address : '';
        this.contact_number = data.hasOwnProperty('contact_number') ? data.contact_number : '';
        this.emergency_contact = data.hasOwnProperty('emergency_contact') ? data.emergency_contact : '';
        this.company_name = data.hasOwnProperty('company_name') ? data.company_name : '';
        this.company_details = data.hasOwnProperty('company_details') ? data.company_details : {}
        
        // For Visitor
        this.purpose_visit = data.hasOwnProperty('purpose_visit') ? data.purpose_visit : ''
        this.contact_person = data.hasOwnProperty('contact_person') ? data.contact_person : ''
        this.destination = data.hasOwnProperty('destination') ? data.destination : ''

        // For Adding Staff
        this.position = data.hasOwnProperty('position') ? data.position : ''

        // For Adding Blacklist
        this.reason_blacklist = data.hasOwnProperty('reason_blacklist') ? data.reason_blacklist : ''

        this.id_words = []
        this.converted_image = []
    }
    eraseAll()
    {
        this.account_img =  '';
        this.id_img = '';
        this.address = ''
        this.last_name = ''
        this.given_name = ''
        this.middle_name = ''
        this.gender = 'Male'
        this.birthday = ''
        this.nationality = ''
        this.id_num = ''
        this.contact_number = ''
        this.emergency_contact = ''
        this.company_name = ''
        this.home_address = ''


        // For Adding Staff
        this.position = '',

        // For Adding Blacklist
        this.reason_blacklist = ''
    }

    getIDInformation(type, image_text)
    {
        this.eraseAll()
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
            this.last_name = image[2].lines.length === 2 ? image[2].lines[0].words[0].text : image[2].lines[1].words[0].text
            this.given_name = image[2].lines.length === 2 ? image[2].lines[1].words[0].text : image[2].lines[1].words[0].text
            this.middle_name = image[3].lines[0].words.length > 1 ? image[3].lines[0].words[image[3].lines[0].words.length - 1].text : image[3].lines[0].words[0].text
            this.id_num = image[3].lines[1].words.length > 1 ? image[3].lines[1].words[image[3].lines[2].words.length - 1].text : image[3].lines[1].words[0].text
            this.birthday = image.length == 5 ? image[4].lines[0].words[0].text : ''
            if (this.birthday)
            {
                this.birthday = this.birthday.split("/")
                this.birthday = this.birthday[2] + "-" + this.birthday[0] + "-" + this.birthday[1]
            }
            this.gender = 'Male'
            this.address = ''
            
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

    getPostalIDInfo(image)
    {
        if (image.length == 5 || image.length == 4)
        {
            this.middle_name = ''
            this.id_num = ''
            this.birthday = ''
            this.gender = 'Male'
            this.address = ''
            
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

    getDriversLicenseInfo(image)
    {
        if (image.length == 4)
        {
            this.last_name = image[0].lines[5].words[0].text.replace(/[^a-zA-Z0-9]/g, ' ')
            for (let index = 1; index < image[0].lines[5].words.length - 1; index++) {
                this.given_name = this.given_name + image[0].lines[5].words[index].text + (index == image[0].lines[5].words.length - 1 ? " " : '')   
            }
            this.middle_name = image[0].lines[5].words[image[0].lines[5].words.length -1].text
            this.id_num = ''
            
            this.gender = image[0].lines[9].words.length == 2 ? image[0].lines[9].words[0].text : 'Male'
            this.gender = image[0].lines[10].words.length == 2 ? image[0].lines[10].words[0].text : 'Male'
            this.nationality = image[0].lines[10].words.length == 2 ? image[0].lines[9].words[0].text.replace(/[^a-zA-Z]/g, '') : image[0].lines[10].words[0].text.replace(/[^a-zA-Z]/g, '')
            this.birthday = image[0].lines[9].words.length == 2 ? image[0].lines[9].words[1].text.replace(/[^/0-9]/g, ' ') : image[0].lines[10].words[1].text.replace(/[^/0-9]/g, ' ')
            
            if (this.birthday)
            {
                this.birthday = this.birthday.split("/")
                this.birthday = this.birthday[0] + "-" + this.birthday[1] + "-" + this.birthday[2]
            }

            for (let address = 10; address < image[0].lines.length; address++) {
                if (image[0].lines[address].words.length > 4)
                {
                    for (let word of image[0].lines[address].words) {
                        this.address = this.address + word.text + " "
                    }
                    if ((address + 1) <= image[0].lines.length - 1 && image[0].lines[address + 1].words < 3)
                    {
                        for (let town of image[0].lines[address + 1].words) {
                            this.address = this.address + town.text + " "
                        }
                    }
                }
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
    
    async submit()
    {
       let data = {
            last_name:          this.last_name,
            middle_name:        this.middle_name,
            given_name:         this.given_name,
            gender:             this.gender,
            birthday:           this.birthday,
            nationality:        this.nationality,
            home_address:       this.home_address,
            contact_number:     this.contact_number,
            emergency_contact:  this.emergency_contact,
            company_name:       this.company_name,
            reason_blacklist:   this.reason_blacklist
        }
        
        await globals.$_post(postAddBlacklist, data);
    }

    checkImage(image)
    {
        Notify.create({
            color: 'red',
            message: ';lkjlkjhkhkjgjtiyjbjk'
        }); 
        
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