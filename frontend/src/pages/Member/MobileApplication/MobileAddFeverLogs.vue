<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
            <div class="content__grid">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content-info">
                        <div class="content__select-img">
                            <div class="content__img-border">
                                <q-img class="content__img" border icon="mdi-camera" id="canvas" width="340" height="280" :src="image_person ? image_person : '/img/placeholder-img.jpg'"></q-img> 
                                <!-- <canvas class="content__img"  border icon="mdi-camera" id="canvas" width="340" height="280"></canvas> -->
                                <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                                <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                                <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                                Picture
                                <q-btn @click="captureImage()" class="btn-upload btn-primary" flat dense no-caps>
                                    <q-icon style="font-size: 13px; margin-right: 3px" name="fas fa-camera"></q-icon> Capture
                                </q-btn>
                            </div>
                            <div class="content__img-border">
                                <q-img class="content__img" border icon="mdi-camera" id="canvas" width="340" height="280" :src="image_id ? image_id : '/img/placeholder-img.jpg'"></q-img> 
                                <!-- <canvas class="content__img"  border icon="mdi-camera" id="canvas" width="340" height="280"></canvas> -->
                                <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                                <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                                <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                                ID
                                <q-btn @click="captureID()" class="btn-upload btn-primary" flat dense no-caps>
                                    <q-icon style="font-size: 13px; margin-right: 3px" name="fas fa-camera"></q-icon> Capture
                                </q-btn>
                            </div>
                        </div>
                        
                        <div class="frontdesk__content">
                            <div class="header__title">Personal Information</div>
                            <div class="content__select">
                                <div class="content__select-label">Type of Account*</div>
                                <q-select v-model="person_information.category" :options="options_account" outlined dense></q-select>
                            </div>
                            <div class="content__select">
                                <div class="content__select-label">ID Type*</div>
                                <q-select v-model="person_information.id_type" :options="options_id" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Temperature Check</div>
                                <q-input type="number" v-model="person_information.temperature" outlined dense></q-input>
                            </div>
                            <div class="header__title">Personal Information</div>
                            <div class="content__input">
                                <div class="content__input-label">First name*</div>
                                <q-input v-model="person_information.given_name" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Last name*</div>
                                <q-input v-model="person_information.last_name" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Middle name*</div>
                                <q-input v-model="person_information.middle_name" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Email*</div>
                                <q-input v-model="person_information.email" outlined dense></q-input>
                            </div>
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender*</div>
                                    <q-select v-model="person_information.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birthdate*</div>
                                    <q-input v-model="person_information.birthday" type="date"  outlined dense></q-input>
                                </div>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input v-model="person_information.home_address" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input v-model="person_information.nationality" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Contact Number</div>
                                <q-input type="number" v-model="person_information.contact_number" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Emergency Contact Number</div>
                                <q-input type="number" v-model="person_information.emergency_contact" outlined dense></q-input>
                            </div>
                            <q-separator />
                            <div class="content__input">
                                 <q-btn @click="submit()" label="Save" class="btn-upload btn-primary" flat dense no-caps/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Model from "../../../models/Model";
import MobileModel from "../../../models/MobileModel";
// import "./MobileFilterFeverLogs.scss";
import "./MobileInput.scss";
// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';
import PersonalInformation from '../../../classes/PersonalInformation';
import { postGetDevice } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export default {
    data:() =>
    ({  
        mobile_db: new MobileModel(),
        person_information: {
            person_image: '',
            id_image: '',
            last_name: '',
            given_name: '',
            middle_name: '',
            gender: 'Male',
            birthday: '',
            nationality: '',
            id_type: 'Others',
            category: '',
            temperature: '',
            contact_number: '',
            emergency_contact: '',
            home_address: '',
            email: ''
        },
        select_company: 'CPIP',
        option_company: [
            'CPIP', 'Royal' , 'Others'
        ],
        select_account_type:'All',
        option_account_type:[
            'All', 'Staff' , 'Visitor'
        ],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        select_device_name: 'Vision Sky',
        option_device_name: [
            'Vision Sky', 'Smart Pass'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_account: [
            'Staff' , 'Visitor'
        ],
         options_id: [
            'Others', 'Drivers License'
        ],
        company_details: {},
        image_person: '',
        image_id: '',
        db: new Model()
    }),
    watch:
    {

    },
    async created()
    {
        // await this.db.initialize();
        // this.check()
    },
    async mounted()
    {
        if (this.$user_info.company)
        {
            let company = await this.$_company({_id: this.$user_info.company._id})
            this.company_details = company[0]
        }
        // await this.db.initialize()
    },
    methods:
    {
        async getLocation()
        {
            let coordinates = {}
            let location_desc = ''
            try
            {
                let location = await this.$_current_position()
                coordinates = {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude
                }
                let loc_details = await this.$_nearby_places(coordinates)
                for (let x = 0; x < loc_details.length; x++) {
                    if (location_desc) location_desc = location_desc + ', '
                    location_desc = location_desc + loc_details[x];  
                }
                return {location: location_desc, coords: coordinates}
            }
            catch(e){
                return {}
            }
        },
        async submit()
        {
            let error = ''
            const capitalize = (str) =>
            {
                str = str.split(" ");

                for (var i = 0, x = str.length; i < x; i++)
                {
                    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
                }

                return str.join(" ");
            }

            this.$q.loading.show();
            let obj = this.person_information
            Object.keys(obj).forEach(function(key) {
                if (!obj[key]) 
                {
                    error = capitalize(key.replace('_', ' '))
                }
            });
            if (error)
            {
                this.$q.notify(
                {
                    color: 'red',
                    message: error + ' is required!'
                });
            }
            else
            {
                let result           = '';
                let characters       = '0123456789';
                let charactersLength = characters.length;
                for ( let i = 0; i < 9; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                let location = {}
                if(navigator.onLine) await this.getLocation()
                let coordinates = location.coords ? location.coords : {}
                let location_desc = location.location ? location.location : ''
    
                let data = {
                    id_image: this.person_information.id_image,
                    person_img: this.person_information.person_image,
                    last_name: this.person_information.last_name,
                    middle_name: this.person_information.middle_name,
                    given_name: this.person_information.given_name,
                    gender: this.person_information.gender,
                    birthday: new Date(this.person_information.birthday),
                    nationality: this.person_information.nationality,
                    home_address: this.person_information.home_address,
                    contact_number: this.person_information.contact_number,
                    emergency_contact: this.person_information.emergency_contact,
                    date_created: new Date(),
                    company_name: this.company_details.company_name ? this.company_details.company_name : 'none',
                    company_id: this.company_details._id ? this.company_details._id : 'none',
                    is_active: true,
                    email: this.person_information.email,
                    position: this.person_information.position,
                    category: this.person_information.category,
                    frontdesk_person_id: result,
                    frontdesk_person_date: new Date(),
                    saved_from: this.company_details._id ? this.company_details._id : 'none',
                    temperature: this.person_information.temperature,
                    location_coordinates: coordinates,
                    location: location_desc
                }
                await this.mobile_db.save(data, result)
                this.$router.push({
                    name: "member_mobile_sync_to_cloud"
                })   
            }

            
            this.$q.loading.hide();
        },

        async checkImage(image)
        {
            if (image) 
            {
                try
                {
                    let ocr_convert = new OpticalReadClass()
                    await ocr_convert.ocrUnirest(this.person_information.id_type, image )
    
                    this.person_information.id_number = ocr_convert.id_num
                    this.person_information.given_name = ocr_convert.given_name
                    this.person_information.last_name = ocr_convert.last_name
                    this.person_information.middle_name = ocr_convert.middle_name
                    this.person_information.home_address = ocr_convert.home_address
                    this.person_information.gender = ocr_convert.gender
                    this.person_information.birth_date = ocr_convert.birthday ? ocr_convert.birthday : null
                    this.person_information.nationality = ocr_convert.nationality
                }
                catch(e){}
            }
        },

        async uploadImage(type)
        {
            let src = await this.$_callGallery()
            this.$q.loading.show();

            toDataUrl(src, async (myBase64)=> {
                let image = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                if (type)
                {
                    this.image_person = src
                    this.person_information.person_image = image
                }
                else
                {
                    this.image_id = src
                    this.person_information.id_image = image
                    if (this.person_information.id_image && this.person_information.id_type != 'Others') await this.checkImage(this.person_information.id_image)
                }
                console.log(this.person_information, 'person');
                // console.log(myBase64, 'image');
                // const contentType = 'image/png';
                // const blobb = base64StringToBlob(myBase64, contentType)
                // blobb.lastModifiedDate = new Date()
                // let formData = new FormData();

                // formData.append('image', blobb, 'person' + Date.now().toString() + '.png');
                // return await this.$_post_file(formData);  
            });
        },

        async captureImage()
        {
            await this.uploadImage(true)
            this.$q.loading.hide();
        },
        async captureID()
        {
            await this.uploadImage(false)
            this.$q.loading.hide();
        }
    },
}
</script>
