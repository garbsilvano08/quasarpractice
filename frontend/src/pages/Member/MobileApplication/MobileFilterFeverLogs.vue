<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
            <div class="content__grid">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__select">
                                <q-select :options="options_id" outlined dense></q-select>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Account Type</div>
                                    <q-select class=" bg-blue-grey-1" :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date from</div>
                                    <q-select :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date to</div>
                                    <q-select :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time from</div>
                                    <q-select :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time to</div>
                                    <q-select :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Device Name</div>
                                    <q-select :options="options_id" outlined dense></q-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./MobileFilterFeverLogs.scss";
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
            'Others', 'Drivers License'
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
            id_type: 'Others',
            id_number: null,
            first_name: null,
            middle_name: null,
            email: null,
            last_name: null,
            gender: 'Male',
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
            destination: null,
            delivery_name: null
        },
        options_delivery_name: [
            'Lazada' , 'Shoppee', 'LBC', 'Fedex', 'Food Panda', 'Grabfood', 'Lalamove', 'Lalafud', 'Mr Speedy', 'Mc Donalds', 'Jollibee', 'Chowking', 'Others'
        ],
        device_list: [],

        db: new Model()
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

                    if (
                        !this.personal_information.id_number ||
                        !this.personal_information.first_name ||
                        !this.personal_information.last_name ||
                        !this.personal_information.home_address ||
                        !this.personal_information.contact_number ||
                        !this.personal_information.birth_date ||
                        !this.personal_information.account_img ||
                        !this.personal_information.id_image
                    )
                    {
                        if (!this.personal_information[validate]) throw new Error(field + ' is required.');
                    }
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
                
                this.$router.push({
                        name: 'member_accountdirectory',
                        params: {
                            category: 'Visitor',
                        }
                        })
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

                let oFReader = new FileReader();
                let formData = new FormData();

                // formData.append('image',document.getElementById("uploadImage").files[0]);
                formData.append('image', blobb, 'person' + Date.now().toString() + '.png');
                if (this.image_type == 'id')
                {
                    this.face_pic_path = await this.$_post_file(formData);
                    this.personal_information.id_image = this.face_pic_path
                }
                else
                {
                    this.face_pic_path = await this.$_post_file(formData);
                    this.personal_information.account_img = this.face_pic_path
                }

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
                let image_data = null
    
                await document.getElementById("snap").addEventListener("click", async() => {
                    context.drawImage(video, 0, 0, 640, 480);
    
                this.image = canvas.toDataURL("image/png")
                image_data = this.image
                // window.location.href=image;
                this.is_carturing = false
                // data:image/png;base64,
                image_data = image_data.replace(/^data:image\/[a-z]+;base64,/, "");
    
                  await this.uploadImage(image_data)
                  if (this.image_type == 'id' && this.personal_information.id_type == 'Drivers License') await this.checkImage(this.face_pic_path)
                });
                // this.open_camera = false
                // if (type) this.$refs.idUploader.click();
                // else this.$refs.uploader.click();
                // await video.pause()
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
