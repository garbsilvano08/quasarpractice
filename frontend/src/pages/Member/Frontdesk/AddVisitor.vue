<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD VISITOR</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit()" class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
                <!-- <q-btn @click="test()" class="btn-save btn-primary" flat dense no-caps label="Test"></q-btn> -->
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <canvas class="content__img"  border icon="mdi-camera" id="canvas" width="640" height="480"></canvas>
                            <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                            <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                            <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture Face"  @click="openCamera('face')"></q-btn>
                        </div>
                    </div>
                    <!-- BODY TEMPERATURE -->
                    <!-- <div class="frontdesk__content-info">
                        <div class="content__title">Body Temperature</div>
                        <div class="frontdesk__content-temperature">36°C</div>
                    </div> -->
                    <!-- CHOOSE ID -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="personal_information.id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <canvas class="content__img"  border icon="mdi-camera" id="id_canvas" width="640" height="480"></canvas>
                            <!-- <video v-show="is_carturing" class="content__img" id="id_video" width="500" height="500" autoplay></video> -->
                            <!-- <q-img class="content__img img__sm" :src="personal_information.id_image ? personal_information.id_image : '/img/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadIDImage" accept="image/*" @change="checkImage()" ref="idUploader" type="file"> -->
                            <q-btn @click="openCamera('id')" class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
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
                                    <q-select v-model="personal_information.gender" :options="options_gender" outlined dense></q-select>
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
                            <div class="content__input">
                                <div class="content__input-label">Location</div>
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
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input v-model="personal_information.contact_number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input v-model="personal_information.emergency_contact_number" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="frontdesk__content content__box" style="margin-top: 30px;">
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Visitor's Purpose</div>
                            <!-- Purpose of Visit -->
                            <div class="content__select">
                                <div class="content__select-label">Purpose of Visit</div>
                                <q-select v-model="visitor_purpose.purpose_visit" :options="options_visit_purpose" outlined dense></q-select>
                            </div>
                            <!-- Visitor Details -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Person</div>
                                    <q-input v-model="visitor_purpose.contact_person" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Destination</div>
                                    <q-input v-model="visitor_purpose.destination" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- UNUSUAL BODY TEMPERATURE -->
        <q-dialog v-model="profile_img_dialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <div class="profile">
                    <div class="profile__header">
                        <div class="profile__header-title">Unusual Body Temperature</div>
                        <q-btn flat dense round icon="mdi-close" size="13px" @click="profile_img_dialog = false"></q-btn>
                    </div>
                    <div class="profile__body">
                        <div class="profile__info">
                            <q-img class="profile__info-img img-active" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.1°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.2°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                            <div class="profile__info-details">38.3°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.4°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=402&q=80"></q-img>
                            <div class="profile__info-details">38.5°C Body Temp.</div>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>
         <q-dialog v-model="open_camera">
                <q-card>
                    <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Capture Image</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section>
                        <div class="text-center">
                            <video id="video" width="500" height="500" autoplay></video>
                            <q-btn icon="mdi-camera" @click="openFilemanager()" id="snap"></q-btn>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
    </div>
</template>

<script>
import "./Frontdesk.scss";
import Model from "../../../models/Model";

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
// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';
import { postGetDevice } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';

export default {
    data:() =>
    ({
        is_carturing: true,
        image: '',
        captured_pic: "",
        id_url : 'https://fleek.geer.solutions/storage/photos/Z3zuI9NN61eJoh5yDHJEaNOGGDC2z9o2NWzEpbwc.jpeg',
        visitor_class: new OpticalReadClass(),
        pic: [],
        profile_img_dialog: false,

        options_id: [
            'Drivers License', 'PIC'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        image_type: '',
        options_location: [],
        open_camera: false,
        // Submit Data
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
            emergency_contact_number: null,
            location: null
        },
        face_pic_path: '',
        visitor_purpose:
        {
            purpose_visit: null,
            contact_person: null,
            destination: null
        },
        device_list: [],

        db: new Model()
    }),
    watch:
    {
        open_camera(val)
        {
            if (val)
            {
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
                }
            }
        },
        
    },
    async mounted()
    {
        await this.getAllDevice(this.$user_info.company._id);
    },
    methods:
    {
        async getAllDevice(id)
        {
           this.device_list = await this.$_post(postGetDevice, {find_device: {company_id: id}});
           this.device_list = this.device_list.data;
        },
        test()
        {
            this.visitor_purpose=
            {
                purpose_visit: 'Collection and Pickup',
                contact_person: 'Ako',
                destination: 'Sa kanila'
            },
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
        async checkImage(image)
        {   
            this.$q.loading.show();
            console.log(image);
            // let img = await this.getImageURL('id')
            this.personal_information.id_image = image
            // this.$q.loading.show();
            if (image) await this.visitor_class.ocrUnirest(this.personal_information.id_type, image )
            this.personal_information.id_number = this.visitor_class.id_num
            this.personal_information.first_name = this.visitor_class.given_name
            this.personal_information.last_name = this.visitor_class.last_name
            this.personal_information.middle_name = this.visitor_class.middle_name
            this.personal_information.home_address = this.visitor_class.home_address
            this.personal_information.gender = this.visitor_class.gender
            this.personal_information.birth_date = this.visitor_class.birthday ? this.visitor_class.birthday : null
            this.personal_information.nationality = this.visitor_class.nationality
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
        async submit()
        {
            try
            {
                this.personal_information.birth_day = new Date(this.personal_information.birth_date)
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

                    if (!this.personal_information[validate]) throw new Error(field + ' is required.');
                }

                for (let validate in this.visitor_purpose)
                {
                    let field = validate;

                    if (field === 'purpose_visit') field = "Purpose of Visit";
                    else field = capitalize(field.replace('_', ' '));

                    if (!this.visitor_purpose[validate]) throw new Error(field + ' is required.');
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

                let data = await this.db.add(
                {
                    personal_information: this.personal_information,
                    visitor_purpose: this.visitor_purpose
                },
                'visitors');

                setTimeout(() => {
                    this.visitor_purpose = {}
                    this.personal_information = {}
                });
                
                this.$q.notify(
                {
                    color: 'green',
                    message: 'Account was successfully created'
                });
                
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
                this.personal_information.account_img = image_url
    
                let oFReader = new FileReader();
                let formData = new FormData();
    
                // formData.append('image',document.getElementById("uploadImage").files[0]); 
                formData.append('image', blobb, 'person' + Date.now().toString() + '.png'); 
                this.face_pic_path = await this.$_post_file(formData);
                console.log(this.face_pic_path);
                
                this.$q.loading.hide();
            }

            this.open_camera = false

        },

        

        async getImageURL(type)
        {
            let oFReader = new FileReader();
            const formData = new FormData();
            if (type == 'id') formData.append('image',document.getElementById("uploadIDImage").files[0]); 
            else formData.append('image',document.getElementById("uploadImage").files[0]); 

            return await this.$_post_file(formData);
        },

        async openFilemanager()
        {
            this.$q.loading.show();
            var canvas = this.image_type == 'id' ? document.getElementById('id_canvas') : document.getElementById('canvas');
            var context =   canvas.getContext('2d');
            var video = document.getElementById('video');;
            console.log(canvas, 'checking');
            let image_data = null

            await document.getElementById("snap").addEventListener("click", async() => {
                context.drawImage(video, 0, 0, 640, 480);

            this.image = canvas.toDataURL("image/png")
            image_data = this.image
            // window.location.href=image;
            this.is_carturing = false
            console.log(image_data, 'image');
            // data:image/png;base64,
            image_data = image_data.replace(/^data:image\/[a-z]+;base64,/, "");

              await this.uploadImage(image_data)
              if (this.image_type == 'id') await this.checkImage(this.face_pic_path)
            });
            // this.open_camera = false
            // if (type) this.$refs.idUploader.click();
            // else this.$refs.uploader.click();
            this.$q.loading.hide();
        },
        openCamera(type)
        {
            this.image_type = type
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            // var id_canvas = document.getElementById('id_canvas');
            // var id_video = document.getElementById('id_video');
            this.open_camera = true
        },
    },
    async created()
    {
        await this.db.initialize();
        // this.check()
    }
}
</script>
