<template>
    <q-layout>
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard"/>
                <div class="header_title">Filter</div>
            <q-btn flat dense round icon="fas fa-check" aria-label="Generate" @click="searchFiltered"/>
            </q-toolbar>
        </q-header>
        <!-- body -->
        <div class="frontdesk">
        <div class="frontdesk__container">
            <div class="content__grid">
                <div class="frontdesk__content content__box"  style="padding-top: 100px">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__select">
                                <!-- <q-select v-model="select_company" :options="option_company" outlined dense></q-select> -->
                                <com-picker :user="this.$user_info" @select=getCompanyData class="btn-choose"></com-picker>
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
                                    <q-input type="time" v-model="time_from" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time to</div>
                                    <q-input type="time" v-model="time_to" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Device Name</div>
                                    <q-select class="bg-blue-grey-2" v-model="option_device" :options="device_list" outlined dense></q-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </q-layout>
    
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
import { 
postGetMobileCompanies,
postGetMobileDevices,
 } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';
import  ComPicker from "../../../components/companyPicker/ComPicker"
export default {
    components: {
        ComPicker
    },
    data:() =>
    ({  
        option_company : {},
        select_account_type:'All',
        option_account_type:[
            'All', 'Staff' , 'Visitor'
        ],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        option_device: '',
        device_list: '',
        time_from: '00:00',
        time_to: '23:59',
        company_details: {},
        
    }),
    watch:
    {

    },
    async mounted()
    {   
        //get company name
        this.company_details = this.$user_info.company ? this.$user_info.company : {}

        //get device
        let device_data = await this.$_post(postGetMobileDevices)
        this.device_list = device_data.data.map(e => {
            return {
                label: e.device_name,
                value: e.device_name
            }
        })
        this.option_device = this.device_list[0].value
    },
    methods:
    {   
        searchFiltered(){
            let data = {
                company_details:this.company_details,
                account_type:   this.select_account_type,
                start_date:     this.startDate,
                end_date:       this.endDate,
                time_from:      this.time_from,
                time_to:        this.time_to,
                device_name:    this.option_device
            }
            this.$router.push({
                    name: "member_mobile_dashboard",
                    params:{
                        filter_fever_logs : data,
                        from_filter_fever_logs : 'filter_fever'
                    }
                    
                })
        },
        goToDashboard()
        {
            this.$router.push({
                    name: "member_mobile_dashboard"
                })   
        },
        getCompanyData(value)
        {
            this.company_details = value
        },
    },
}
</script>
