<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
            <div class="content__grid">
                <div class="frontdesk__content content__box-filter">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__select">
                                <q-select v-model="select_company" :options="option_company" outlined dense></q-select>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Account Type</div>
                                    <q-select class="bg-blue-grey-2" v-model="select_account_type" :options="option_account_type" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date from</div>
                                    <q-input type="date" v-model="startDate" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date to</div>
                                    <q-input type="date" v-model="endDate" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time from</div>
                                    <q-select  outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time to</div>
                                    <q-select  outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Device Name</div>
                                    <q-select class="bg-blue-grey-2" v-model="select_device_name" :options="option_device_name" outlined dense></q-select>
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
import "./MobileInput.scss";
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
    }),
    watch:
    {

    },
    async mounted()
    {
        
    },
    methods:
    {
    },
}
</script>
