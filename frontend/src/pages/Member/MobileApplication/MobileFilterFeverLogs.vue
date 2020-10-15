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
                <div class="frontdesk__content content__box-filter">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__select">
                                <div class="content__select-label">Company</div>
                                <!-- <q-select v-model="select_company" :options="option_company" outlined dense></q-select> -->
                                <com-picker :user="this.$user_info" @select=getCompanyData class="btn-choose"></com-picker>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Account Type</div>
                                    <q-select class="bg-blue-grey-2" v-model="filter_logs.account_type" :options="option_account_type" outlined dense></q-select>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date from</div>
                                    <q-input type="date" v-model="filter_logs.start_date" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Date to</div>
                                    <q-input type="date" v-model="filter_logs.end_date" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time from</div>
                                    <q-input type="time" v-model="filter_logs.start_time" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Time to</div>
                                    <q-input type="time" v-model="filter_logs.end_time" outlined dense></q-input>
                                </div>
                            </div>
                            <div class="frontdesk__content">
                                <div class="content__select">
                                    <div class="content__select-label">Device Name</div>
                                    <q-select class="bg-blue-grey-2" v-model="filter_logs.device_name" :options="device_list" outlined dense></q-select>
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
        option_device: '',
        device_list: [],
        time_from: '00:00',
        time_to: '23:59',
        company_details: {},

        filter_logs: {
            company_list: [],
            company_names: [],
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
            start_time: '00:00',
            end_time: '23:59',
            account_type: 'All',
            device_name: 'All',
        },
        
    }),
    watch:
    {

    },
    async mounted()
    {    
        this.company_details = this.$user_info.company
        this.filter_logs = this.$route.params.filter
        await this.getDevice()
    },
    methods:
    {   
        async getDevice()
        {
            this.device_list = []
            let device = await this.$_devices({find_device: {company_id: this.company_details._id}})
            for (let i = 0; i < device.length; i++) {
                this.device_list.push({
                    label: device[i].device_name,
                    value: device[i].device_id
                })
            }
        },

        searchFiltered(){
            console.log(this.filter_logs);
            this.filter_logs.company = this.company_details
            this.$router.push({
                name: "member_mobile_dashboard",
                params: this.filter_logs
            })
        },
        goToDashboard()
        {
            let data = this.$route.params.filter
            data.company = this.company_details
            this.$router.push({
                    name: "member_mobile_dashboard",
                    params: data
                })   
        },
        async getCompanyData(value)
        {
            this.company_details = value
            await this.getDevice()
        },
    },
}
</script>
