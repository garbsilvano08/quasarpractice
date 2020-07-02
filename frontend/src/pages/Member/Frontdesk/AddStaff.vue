<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD STAFF</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Take a Photo" @click="openCamera"></q-btn>
                        </div>
                    </div>
                    <!-- CHOOSE ID -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <q-img id="canvas" class="content__img img__sm" :src="id_url ? id_url : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <q-btn @click="checkImage()" class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
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
                                    <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">ID Type</div>
                                    <q-input v-model="id_class.id_info.id_num" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name</div>
                                <q-input v-model="id_class.id_info.given_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name</div>
                                <q-input v-model="id_class.id_info.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name</div>
                                <q-input v-model="id_class.id_info.middle_name" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender</div>
                                    <q-select v-model="id_class.id_info.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date</div>
                                    <q-input v-model="id_class.id_info.birthday" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input v-model="id_class.id_info.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input  v-model="id_class.id_info.address" outlined dense></q-input>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input outlined dense></q-input>
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
                        <video id="video" width="500" height="500" autoplay></video>
                        <q-btn icon="camera" @click="takePhoto"  id="snap"></q-btn>
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
    </div>
</template>

<script>
import "./Frontdesk.scss";

// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';

export default {
    data:() =>
    ({
        id_url : 'https://fleek.geer.solutions/storage/photos/T1VmkucmNHJfG6HbPhBi4gGvOPK8h8H63FPQbYIO.jpeg',
        open_camera: false,
        profile_img_dialog: false,
        select__id_type: 'PIC',
        select__gender: '',
        select__visit_purpose: '',
        options_id: [
            'Drivers License', 'Postal ID' , 'PIC'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        id_class: new OpticalReadClass(),
        is_done: false
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
        is_done(val)
        {
            if (val)
            {
                // console.log(val);

            }
        }
    },

    methods:
    {
        testing(){
            var formData = new FormData();
            console.log("Asd")
            formData.append("pass", "123456");
            formData.append("length", "50"); // number 123456 is immediately converted to a string "123456"
            formData.append("index", "0"); // number 123456 is immediately converted to a string "123456"
            
            // HTML file input, chosen by user
            // formData.append("userfile", fileInputElement.files[0]);

            // JavaScript file-like object
            // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
            // var blob = new Blob([content], { type: "text/xml"});
            // Access-Control-Allow-Origin: *;
            // formData.append("webmasterfile", blob);

            var request = new XMLHttpRequest();
            request.open("POST", "http://192.168.1.177:8080/person/findByPage");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(JSON.parse(request.responseText));
                }
            }
            request.send(formData);
        },

        async checkImage(image)
        {
            this.$q.loading.show();
            this.is_done = await this.id_class.ocrUnirest(this.select__id_type,this.id_url)
            this.$q.loading.hide();
        },

        openCamera()
        {
            this.open_camera = true
        },

        async takePhoto()
        {
            var canvas = document.getElementById('canvas');
            console.log(canvas, ';l;l;l;');
            
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');

            document.getElementById("snap").addEventListener("click", function() {
                context.drawImage(video, 0, 0, 640, 480);

            this.image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            });
        }
    }
}
</script>
