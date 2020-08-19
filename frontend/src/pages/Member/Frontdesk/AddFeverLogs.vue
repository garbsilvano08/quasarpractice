<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD FEVER LOGS</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit" class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
                 <!-- <q-btn @click="test()" class="btn-save btn-primary" flat dense no-caps label='Test'></q-btn> -->
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" :src="personal_information.person_img ? personal_information.person_img : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Browse Face Detection" @click="getPassLogs"></q-btn>
                        </div>
                    </div>
                    <!-- BODY TEMPERATURE -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Body Temperature</div>
                        <div class="frontdesk__content-temperature">{{ personal_information.temperature ? personal_information.temperature + '°C' : '' }}</div>
                    </div>
                    <!-- CHOOSE ID -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="personal_information.id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__id">
                            <canvas class="content__img img__id"  border icon="mdi-camera" id="canvas" width="640" height="480"></canvas>
                            <q-btn @click="openCamera()" class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
                            <!-- <q-img class="content__img img__sm" :src="personal_information.id_image ? personal_information.id_image : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__grid-right">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Personal Information</div>
                            <!-- ID Information -->
                            <!-- <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Identification Card Type</div>
                                    <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                                </div> -->
                                <div class="content__input">
                                    <div class="content__input-label">ID Number *</div>
                                    <q-input v-model="personal_information.id_num" outlined dense></q-input>
                                </div>
                            <!-- </div> -->
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name *</div>
                                <q-input v-model="personal_information.given_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name *</div>
                                <q-input v-model="personal_information.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name *</div>
                                <q-input v-model="personal_information.middle_name" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender *</div>
                                    <q-select v-model="personal_information.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date *</div>
                                    <q-input type="date" v-model="personal_information.birthday" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality *</div>
                                <q-input v-model="personal_information.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address *</div>
                                <q-input v-model="personal_information.home_address" outlined dense></q-input>
                            </div>
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Location *</div>
                                    <q-select
                                        outlined
                                        dense
                                        v-model="personal_information.location"
                                        use-input
                                        input-debounce="1000"
                                        :options="options_location"
                                        @filter="getNearbyPlaces"
                                        option-value="place_id"
                                        option-label="description"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Tag a Company *</div>
                                     <com-picker :user="this.$user_info" @select=getCompanyData></com-picker>
                                    <!-- <q-select v-model="personal_information.company_name" :options="options_company" outlined dense></q-select> -->
                                </div>
                            </div>

                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number *</div>
                                    <q-input v-model="personal_information.contact_number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number *</div>
                                    <q-input v-model="personal_information.emergency_contact" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <q-dialog v-model="open_camera">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Capture Image</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <div class="text-center">
                        <video id="video" width="500" height="450" autoplay></video>
                        <q-btn icon="mdi-camera" @click="openFilemanager()" id="snap"></q-btn>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- UNUSUAL BODY TEMPERATURE -->
        <q-dialog v-model="profile_img_dialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <div class="profile">
                    <div class="profile__header">
                        <div class="profile__header-title">Unusual Body Temperature</div>
                        <q-btn flat dense round icon="mdi-close" size="13px" @click="profile_img_dialog = false"></q-btn>
                    </div>
                    <div class="profile__body">
                        <div v-for="(logs, i) in this.pass_logs" :key="i" @click="selectedLog(logs)" class="profile__info">
                            <q-img class="profile__info-img img-active" :src="logs.person_img"></q-img>
                            <div class="profile__info-details">{{logs.temperature}}°C Body Temp.</div>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import "./Frontdesk.scss";
import OpticalReadClass from '../../../classes/OpticalReadClass';
import { postGetLogs, postPersonByCateg, postSavePerson } from '../../../references/url';
import  ComPicker from "../../../components/companyPicker/ComPicker"
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
    components: { ComPicker },
    data:() =>
    ({
        personal_information:
        {
            id_image: '',
            person_img: '',
            id_type: 'Drivers License',
            id_number: null,
            given_name: null,
            middle_name: null,
            last_name: null,
            gender: null,
            birthday: null,
            nationality: null,
            home_address: null,
            contact_number: null,
            emergency_contact: null,
            temperature: null,
            company_name: '',
            company_id: null,
            location: null,
            location_coordinates: null,
            id_type: 'Drivers License',
        },
        profile_img_dialog: false,
        select__id_type: '',
        select__gender: '',
        select__visit_purpose: '',
        options_id: [
            'Drivers License', 'UMID' , 'PhilHealth'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        pass_logs: [],
        open_camera: false,
        visitor_class: new OpticalReadClass(),
        image: null,
        company_details: {},
        options_location: []
    }),

     watch:
    {


        async open_camera(val)
        {
            if (val)
            {
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                await navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
                }
            }
            else
            {
                let check = await navigator.mediaDevices.getUserMedia({ video: true });
                // await check.removeTrack()
                let tracks = check.getTracks()
                tracks.forEach(function(track) {
                    track.stop();
                });
            }
        },

    },

    methods:
    {
        test()
        {
            this.personal_information =
            {
                id_img: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                id_num: '123423123',
                id_type: 'Drivers License',

                account_img: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                given_name: 'Joe',
                middle_name: 'Jonas',
                last_name: 'Brown',
                gender: 'Male',
                birthday: '2020-07-02',
                nationality: 'Filipino',
                home_address: 'Balagtas',
                contact_number: '09556741079',
                emergency_contact: '09556741079',
                temperature: 38.1,
                location: {
                    "description": "Pandi, Bulacan, Philippines",
                    "id": "a38381d0bd85fb79a8b674555426cb311c0e097e",
                    "matched_substrings": [{
                        "length": 5,
                        "offset": 0
                    }],
                    "place_id": "ChIJ-Ug1FZirlzMRXgh19mV3Myg",
                    "reference": "ChIJ-Ug1FZirlzMRXgh19mV3Myg",
                    "structured_formatting": {
                        "main_text": "Pandi",
                        "main_text_matched_substrings": [{
                            "length": 5,
                            "offset": 0
                        }],
                        "secondary_text": "Bulacan, Philippines"
                    },
                    "terms": [{
                        "offset": 0,
                        "value": "Pandi"
                    }, {
                        "offset": 7,
                        "value": "Bulacan"
                    }, {
                        "offset": 16,
                        "value": "Philippines"
                    }],
                    "types": ["locality", "political", "geocode"]
                },
                location_coordinates: {
                    "lat": 14.8756999,
                    "lon": 120.9592956
                }
            }
        },
         async submit()
        {
            try
            {
                this.personal_information.birthday = new Date(this.personal_information.birthday)
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

                    if (field === 'id_type') field = "ID Card Type";
                    if (field === 'id_number') field = "ID Number";
                    else field = capitalize(field.replace('_', ' '));

                    if (
                        !this.personal_information.id_number ||
                        !this.personal_information.first_name ||
                        !this.personal_information.last_name ||
                        !this.personal_information.middle_name ||
                        !this.personal_information.home_address ||
                        !this.personal_information.contact_number ||
                        !this.personal_information.birthday ||
                        !this.personal_information.person_img ||
                        !this.personal_information.id_image
                    )
                    {
                        if (!this.personal_information[validate]) throw new Error(field + ' is required.');
                    }
                }

                if (this.personal_information.location) this.personal_information.location_coordinates = await this.$_post('member/get/coordinates', { place_id: this.personal_information.location.place_id }).then(res => res.data);

                toDataUrl(this.face_pic_path, async (myBase64)=> {
                let result           = '';
                let characters       = '0123456789';
                let charactersLength = characters.length;
                for ( let i = 0; i < 9; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                this.personal_information.frontdesk_person_id = result
                this.personal_information.frontdesk_person_date = new Date()
                this.personal_information.date_created = new Date(),
                this.personal_information.company_name = this.company_details.company_name,
                this.personal_information.company_id = this.company_details.company_id,
                this.personal_information.is_active = true,
                this.personal_information.category = 'Report',
                this.personal_information.frontdesk_person_id = result,
                this.personal_information.frontdesk_person_date = new Date(),
                this.personal_information.saved_from = this.$user_info.company ? this.$user_info.company._id : ''

                let save = await this.$_post(postSavePerson, {person_info: this.personal_information});
                    if (save.data == true)
                    {
                         this.$q.notify(
                        {
                            color: 'green',
                            message: 'Successfully added Report'
                        });
                    }
                    else
                    {
                       this.$q.notify(
                        {
                            color: 'red',
                            message: 'This account is already existing'
                        });
                    }

                });
            }
            catch (e)
            {
                this.$q.notify(
                {
                    color: 'red',
                    message: e.message
                });
            }
        },

        async getCompanyData(value)
        {
            this.company_details = value
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
        async checkImage(image)
        {
            this.$q.loading.show();
            if (image) await this.visitor_class.ocrUnirest(this.personal_information.id_type, this.personal_information.id_image )
            this.personal_information.id_num = this.visitor_class.id_num
            this.personal_information.given_name = this.visitor_class.given_name
            this.personal_information.last_name = this.visitor_class.last_name
            this.personal_information.middle_name = this.visitor_class.middle_name
            this.personal_information.home_address = this.visitor_class.home_address
            this.personal_information.gender = this.visitor_class.gender
            this.personal_information.birthday = this.visitor_class.birthday ? this.visitor_class.birthday : null
            this.personal_information.nationality = this.visitor_class.nationality
            this.open_camera = false
            this.$q.loading.hide();
        },
        async uploadImage(image_url)
        {
            console.log(image_url);
            if (image_url)
            {
                this.$q.loading.show();
                const contentType = 'image/png';
                const blobb = base64StringToBlob(image_url, contentType)
                blobb.lastModifiedDate = new Date()
                this.personal_information.id_image = image_url

                let oFReader = new FileReader();
                let formData = new FormData();

                formData.append('image', blobb, 'person' + Date.now().toString() + '.png');
                this.personal_information.id_image = await this.$_post_file(formData);
                this.$q.loading.hide();
            }

        },
        async openFilemanager()
        {
            this.$q.loading.show();
            var canvas = document.getElementById('canvas');
            var context =   canvas.getContext('2d');
            var video = document.getElementById('video');;
            let image_data = null

            await document.getElementById("snap").addEventListener("click", async() => {
                context.drawImage(video, 0, 0, 640, 480);

                this.image = canvas.toDataURL("image/png")
                image_data = this.image
                this.is_carturing = false
                image_data = image_data.replace(/^data:image\/[a-z]+;base64,/, "");

                await this.uploadImage(image_data)
                await this.checkImage()
            });

            this.$q.loading.hide();
        },
        openCamera(type)
        {
            this.image_type = type
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            this.open_camera = true
        },
        selectedLog(log)
        {
            this.profile_img_dialog = false
            this.personal_information.person_img = log.person_img
            this.personal_information.temperature = log.temperature
        },

        async getPassLogs()
        {
            this.profile_img_dialog = true

            let last_logs = await this.$_post(postPersonByCateg, {find_by_category: {company_id: this.$user_info.company ? this.$user_info.company._id : '', date_logged: new Date().toISOString().split('T')[0], has_fever: true}, limit: 20})
            this.pass_logs = last_logs.data
        }
    },
    async created()
    {


    }
}
</script>
