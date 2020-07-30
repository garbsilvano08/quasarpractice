<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD FEVER REPORT</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit" class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <div class="frontdesk__content-info">
                        <!-- <q-btn @click="test" class="btn-save btn-primary" flat dense no-caps label="Test"></q-btn> -->
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file">
                            <q-btn @click="openFilemanager" class="btn-upload btn-primary" flat dense no-caps label="Capture Face"></q-btn>
                        </div>
                    </div>

                    <!-- BODY TEMPERATURE -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Body Temperature</div>
                        <!-- <div class="frontdesk__content-temperature">36°C</div> -->
                        <q-input v-model="personal_information.temperature" outlined dense></q-input>
                    </div>

                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="personal_information" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <q-img class="content__img img__sm" :src="personal_information.id_image ? personal_information.id_image : '/img/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadIDImage" accept="image/*" @change="checkImage()" ref="idUploader" type="file">
                            <q-btn @click="openFilemanager" class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__grid-right">
                <div class="frontdesk__content content__box">
                    <div class="frontdesk__content-info">
                        <div class="content__title">Personal Information</div>
                         <!-- ID Information -->
                        <div class="frontdesk__content-grid">
                            <div class="content__select">
                                <div class="content__select-label">Identification Card Type</div>
                                <q-select v-model="personal_information.id_type" :options="options_id" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">ID Number</div>
                                <q-input v-model="personal_information.id_number" outlined dense></q-input>
                            </div>
                        </div>
                        <!-- Firstname -->
                        <div class="content__input">
                            <div class="content__input-label">First Name</div>
                            <q-input v-model="personal_information.first_name" outlined dense></q-input>
                        </div>
                        <!-- Lastname -->
                        <div class="content__input">
                            <div class="content__input-label">Last Name</div>
                            <q-input v-model="personal_information.last_name" outlined dense></q-input>
                        </div>
                        <!-- Middlename -->
                        <div class="content__input">
                            <div class="content__input-label">Middle Name</div>
                            <q-input v-model="personal_information.middle_name" outlined dense></q-input>
                        </div>
                        <!-- Gender and Birthdate -->
                        <div class="frontdesk__content-grid">
                            <div class="content__select">
                                <div class="content__select-label">Gender</div>
                                <q-select v-model=" personal_information.gender" :options="options_gender" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Birth Date</div>
                                <q-input type="date" v-model="personal_information.birth_date" outlined dense></q-input>
                            </div>
                        </div>
                        <!-- Nationality -->
                        <div class="content__input">
                            <div class="content__input-label">Nationality</div>
                            <q-input v-model="personal_information.nationality" outlined dense></q-input>
                        </div>
                        <!-- Home Address -->
                        <div class="content__input">
                            <div class="content__input-label">Home Address</div>
                            <q-input v-model="personal_information.home_address" outlined dense></q-input>
                        </div>
                        <!-- Location -->
                        <!-- <div class="content__select">
                            <div class="content__select-label">Location</div>
                            <q-select v-model="personal_information.location" :options="options_location" outlined dense></q-select>
                        </div> -->
                         <!-- Contact -->
                        <!-- <div class="frontdesk__content-grid"> -->
                            <div class="content__input">
                                <div class="content__input-label">Contact Number</div>
                                <q-input v-model="personal_information.contact_number" outlined dense></q-input>
                            </div>
                            <!-- <div class="content__input">
                                <div class="content__input-label">Emergency Contact Number</div>
                                <q-input v-model="input_emergency_contact_number" outlined dense></q-input>
                            </div> -->
                        <!-- </div> -->
                    </div>
                </div>

                <!-- <div class="frontdesk__content content__box" style="margin-top: 30px;">
                    <div class="frontdesk__content-info">
                        <div class="content__title">Visitor's Purpose</div>
                        <div class="content__select">
                            <div class="content__select-label">Purpose of Visit</div>
                            <q-select v-model="select_visit_purpose" :options="options_purpose" outlined dense></q-select>
                        </div>
                        <div class="frontdesk__content-grid">
                            <div class="content__input">
                                <div class="content__input-label">Contact Person</div>
                                <q-input v-model="input_contact_person" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Destination</div>
                                <q-input v-model="input_destination" outlined dense></q-input>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="mobile-view__btn">
            <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
            <q-btn @click="submit" class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
        </div>

    </div>
</template>

<script>
import { Notify } from 'quasar';
import "./Frontdesk.scss";
import { postGetCompanies, postAddPerson, postUpdateStaff, postSavePerson, postAddReportLog} from '../../../references/url';

export default {
    data:() =>
    ({
        input_id_number: '',
        input_first_name: '',
        input_last_name: '',
        input_middle_name: '',
        input_birth_date: '',
        input_nationality: '',
        input_home_address: '',
        input_contact_number: '',
        input_emergency_contact_number: '',
        input_contact_person: '',
        input_destination: '',
        select_id_type: '',
        select_gender: '',
        select_location: '',
        select_visit_purpose: '',
        options_id: [
            'Drivers License', 'PIC'
        ],
        personal_information:
        {
            id_image: '',
            account_img: '',
            id_type: 'Drivers License',
            id_number: null,
            first_name: null,
            middle_name: null,
            last_name: null,
            gender: null,
            birth_date: null,
            nationality: null,
            home_address: null,
            contact_number: null,
            location: null,
            temperature: null,
        },
        options_gender: [
            'Male','Female'
        ],
        options_location: [
            'Manila, Philippines','Bulacan, Philippines'
        ],
        options_purpose: [
            'Official Business','Collection and Pickup','Delivery','Corporate Meeting','Client/Customer','Guest'
        ]
    }),
    methods: 
    {
        test()
        {
            this.personal_information =
            {
                id_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                account_img: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                id_type: 'Drivers License',
                id_number: '123423123',
                first_name: 'Joe',
                middle_name: 'Jonas',
                last_name: 'Brown',
                gender: 'Male',
                birth_date: '2020-07-02',
                nationality: 'Filipino',
                home_address: 'Balagtas',
                contact_number: '09556741079',
                emergency_contact_number: '09556741079',
                temperature: '37.9'
            }
        },

        async submit()
        {
            console.log(this.personal_information);
            const capitalize = (str) =>
            {
                str = str.split(" ");

                for (var i = 0, x = str.length; i < x; i++) 
                {
                    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
                }

                return str.join(" ");
                }
            for (let validate in this.personal_information)
            {
                let field = validate;

                if (
                    !this.personal_information.first_name ||
                    !this.personal_information.last_name ||
                    !this.personal_information.middle_name ||
                    !this.personal_information.home_address ||
                    !this.personal_information.contact_number ||
                    !this.personal_information.birth_date || 
                    !this.personal_information.account_img ||
                    !this.personal_information.id_image ||
                    !this.personal_information.id_number        
                )
                {
                    this.$q.notify(
                    {
                        color: 'red',
                        message: field + ' is required'
                    });
                    return
                }
            }

            let result           = '';
            let characters       = '0123456789';
            let charactersLength = characters.length;
            for ( let i = 0; i < 9; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            let data = {
                // id_img: this.personal_information.id_img,
                // id_num: this.personal_information.id_num,
                // id_type: this.personal_information.id_type,
                
                // company_details: this.getCompany( this.personal_information.company_name),
                person_img: this.personal_information.account_img,
                last_name: this.personal_information.last_name,
                middle_name: this.personal_information.middle_name,
                given_name: this.personal_information.first_name,
                gender: this.personal_information.gender,
                birthday: this.personal_information.birth_date,
                nationality: this.personal_information.nationality,
                home_address: this.personal_information.home_address,
                contact_number: this.personal_information.contact_number,

                date_created: new Date(),
                company_name: this.$user_info.company.company_name,
                company_id: this.$user_info.company._id,
                is_active: true,

                position: this.personal_information.position,
                category: 'Report',
                frontdesk_person_id: result,
                frontdesk_person_date: new Date(),

                saved_from: this.$user_info.company._id ? this.$user_info.company._id : ''
            }
            
            
            this.$q.loading.show();
            try
            {
                let save = await this.$_post(postSavePerson, {person_info: data});

                let person_log = {
                    mask:                   1,
                    temperature:            this.personal_information.temperature,
                    person_img:             this.personal_information.account_img,
                    full_name:              this.personal_information.first_name + " " + this.personal_information.middle_name + " " + this.personal_information.last_name,
                    company_id:             this.$user_info.company._id,
                    device_id:              null,
                    frontdesk_person_id:    result,
                    date_logged:            new Date(),
                    gender:                 this.personal_information.gender,
                    home_address:           this.personal_information.home_address,
                    birthday:               this.personal_information.birth_date,
                    company_name:           this.$user_info.company.company_name,
                    has_fever:              true,
                }
                await this.$_post(postAddReportLog, {person_info: person_log});

                if (save.data == true)
                {
                    Notify.create({
                        color: 'green',
                        message: 'This person was succesfully saved'
                    }); 
                }
                else
                {
                    Notify.create({
                        color: 'red',
                        message: 'This account is already existing'
                    }); 
                }
                this.personal_information = {}
            }
            catch(e)
            {
                Notify.create({
                    color: 'red',
                    message: 'Try again' + e.message
                }); 
            }
            this.$q.loading.hide();
        },
        async uploadImage(image_url)
        {
            if (image_url)
            {
                this.$q.loading.show();
                const contentType = 'image/png';
                const blobb = base64StringToBlob(image_url, contentType)
                blobb.lastModifiedDate = new Date()
                // const blobUrl = URL.createObjectURL(blob);

                // this.personaluploader_information.account_img = await this.getImageURL();

                let oFReader = new FileReader();
                let formData = new FormData();

                // formData.append('image',document.getElementById("uploadImage").files[0]);
                formData.append('image', blobb, 'person' + Date.now().toString() + '.png');
                if (this.image_type == 'id')
                {
                    this.personal_information.id_image = this.face_pic_path
                }
                else
                {
                    this.personal_information.account_img = this.face_pic_path
                    this.face_pic_path = await this.$_post_file(formData);
                }

                this.$q.loading.hide();
            }

            // this.open_camera = false

        },
        async openFilemanager(type)
        {
            if (type) this.$refs.idUploader.click();
            else this.$refs.uploader.click();

        },
        async checkImage(image)
        {
            this.$q.loading.show();
            // let img = await this.getImageURL('id')
            this.personal_information.id_image = image
            // this.$q.loading.show();
            if (image) 
            {
                let is_converted = await this.ocr_class.ocrUnirest(this.personal_information.id_type, image )
                if (is_converted)
                {
                    this.personal_information.id_number = this.ocr_class.id_num
                    this.personal_information.first_name = this.ocr_class.given_name
                    this.personal_information.last_name = this.ocr_class.last_name
                    this.personal_information.middle_name = this.ocr_class.middle_name
                    this.personal_information.home_address = this.ocr_class.home_address
                    this.personal_information.gender = this.ocr_class.gender
                    this.personal_information.birth_date = this.ocr_class.birthday ? this.ocr_class.birthday : null
                    this.personal_information.nationality = this.ocr_class.nationality
                }
            }
            this.$q.loading.hide();
        },
        async getNearbyPlaces(val, update)
        {
            if (val === '')
            {
                update();
                return;
            }

            // get nearby locations
            let nearby_locations = await this.$_post('member/get/nearby_places', { location: val });

            update(() =>
            {
                this.options_location = nearby_locations.data;
            })
        },

    }
}
</script>
