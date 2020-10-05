<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
            <div class="content__grid">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    
                    <div class="frontdesk__content-info">
                        <div class="content__select-img">
                            <div class="content__img-border">
                                <canvas class="content__img"  border icon="mdi-camera" id="canvas" width="340" height="280"></canvas>
                                <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                                <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                                <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                                Picture
                                <q-btn class="btn-upload btn-primary" flat dense no-caps>
                                    <q-icon style="font-size: 13px; margin-right: 3px" name="fas fa-camera"></q-icon> Capture
                                </q-btn>
                            </div>
                            <div class="content__img-border">
                                <canvas class="content__img"  border icon="mdi-camera" id="canvas" width="340" height="280"></canvas>
                                <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                                <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                                <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                                ID
                                <q-btn class="btn-upload btn-primary" flat dense no-caps>
                                    <q-icon style="font-size: 13px; margin-right: 3px" name="fas fa-camera"></q-icon> Capture
                                </q-btn>
                            </div>
                        </div>
                        </div>
                        <div class="frontdesk__content">
                            <div class="content__input">
                                <div class="content__input-label">Temperature Check</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <div class="header__title">Personal Information</div>
                            <div class="content__input">
                                <div class="content__input-label">First name*</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Last name*</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Middle name*</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender*</div>
                                    <q-select outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birthdate*</div>
                                    <q-input outlined dense></q-input>
                                </div>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input outlined dense></q-input>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./MobileInput.scss";
// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';
import { postGetDevice } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';

export default {
    data:() =>
    ({  
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
    }),
    watch:
    {

    },
    async mounted()
    {
        
    },
    methods:
    {
        async captureImage()
        {
            let image = await this.$_callGallery()
            console.log(image, 'image');
        }
    },
}
</script>
