<template>
    <div class="dashboard">
        <div class="dashboard__overview">
            <div class="dashboard__graph">
                <div class="dashboard__graph-item">
                    <div class="dashboard__graph-content dashboard__graph-pie">
                    <div class="dashboard__pie-chart"  v-if="this.has_fever_logs.length > 0">
                        <pie-chart
                            :donut="true"
                            :legend="false"
                            width="150px"
                            height="150px"
                            :colors="[
                                '#2F84FF',
                                '#FF8B29',
                            ]"
                            :data="{
                                'Staff': count_staff,
                                'Visitor': count_visitor,
                            }"
                            :library="{cutoutPercentage: 85}">
                        </pie-chart>
                        <div class="dashboard__pie-total">
                            <div class="pie-total__amount">{{count_staff + count_visitor}}</div>
                            <div v-if="isToday()" class="pie-total__label">Fever Detected Today</div>
                            <div v-else class="pie-total__label2">Fever Detected</div>
                        </div>
                    </div>
                    <div class="dashboard__pie-chart"  v-else>
                        <pie-chart
                            :donut="true"
                            :legend="false"
                            width="150px"
                            height="150px"
                            :colors="[
                                '#28B463',
                            ]"
                            :data="{
                                'Logs': .1
                            }"
                            :library="{cutoutPercentage: 85}">
                        </pie-chart>
                        <div class="dashboard__pie-total">
                            <div class="pie-total__amount">0</div>
                            <div v-if="isToday()" class="pie-total__label">Fever Detected Today</div>
                            <div v-else class="pie-total__label2">Fever Detected</div>
                        </div>
                    </div>   
                    <div class="dashboard__pie-legend">
                        <div class="pie-legend__item">
                            <div class="pie-legend__color fourth-color"></div>
                            <div class="pie-legend__percent">Staff ({{count_staff}})</div>
                        </div>
                        <div class="pie-legend__item">
                            <div class="pie-legend__color second-color"></div>
                            <div class="pie-legend__percent">Visitor ({{count_visitor}})</div>
                        </div>
                    </div>
                    <!-- <q-btn @click="exportData()" class="btn-primary" flat dense no-caps>Export</q-btn> -->
                    <q-btn v-if="this.has_fever_logs.length > 0" class="btn-primary" flat dense no-caps @click="exportToExcel(), export_alert = true">Export</q-btn>
                    </div>
                <!-- </div> -->
                    <q-dialog v-model="export_alert">
                        <q-card>
                            <q-card-section>
                            <div class="text-h6">Information</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                            Your export file is saved to Internal Storage/Documents/fever-logs_DATETODAY.xls
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="OK" color="primary" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
            </div>
        </div>

        <div class="dashboard__overview-logs">
            <div class="header__title">Fever Logs  <q-icon class="icon-float" name="fas fa-sliders-h" @click="goToFilterLogs"/></div>
            <div v-if="!isToday()" class="date__label" >{{this.filter_logs.start_date + "-"+ this.filter_logs.end_date}}</div>
            <div  v-if="this.has_fever_logs.length > 0">
                <div class="content__card-info content__card" v-for="(logs, index) in this.has_fever_logs" :key="index">
                    <div class="content__info">
                        <div class="flex flex-center">
                            <q-img :src="logs.person_img"></q-img>
                        </div>
                        <div class="content__temperature">
                            {{logs.temperature}}<br>
                            <span class="abnormal-temperature">Has fever</span>
                        </div>
                    </div>
                    <div class="content__info">
                        <div class="content__name">
                            {{logs.full_name}} <br>
                            <span>{{logs.category}}</span>
                        </div>
                        <div class="content__location">
                            <label>Tagged to:</label> {{logs.company_name}}
                        </div>
                        <div class="content__room">
                            <label>Device Scanned:</label> {{deviceInfo(logs.device_id, 'name') + "-" + deviceInfo(logs.device_id, 'type')}}
                        </div>
                        <div class="content__datetime">
                            <label>Date & Time:</label> {{logs.date_string}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="content__card no_fever_logs"><span class="fas fa-users"></span> <p>No Fever Logs Yet</p></div>
            </div>
        </div>
        <div v-if="(this.count_staff + this.count_visitor) > this.has_fever_logs.length" class="add_fever_logs-spinner">
            <q-spinner
                color="primary"
                size="2em"
                :thickness="2"
            />
        </div>
        <div class="add_fever_logs-btn" @click="goToAddUserLogs">
            <q-icon name="fas fa-plus"></q-icon>
        </div>
   </div>
</template>

<script>
import { base64StringToBlob } from 'blob-util';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import "./MobileDashboard.scss";
import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import "chart.js"
import { postGetMobileFeverLogs, postGetDevice } from '../../../references/url';
// Classes
import { date } from 'quasar';
import { log } from 'util';
import { saveAs } from 'file-saver';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

Vue.use(Chartkick.use(Chart))

export default
{
   components: { 
       ComPicker,
    },
   //pointerdata
   data:() =>
   ({
        count_staff: 0,
        count_visitor: 0,
        has_fever_logs: [],
        device_list: {},
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
        export_alert: false,
   }),

   watch:{},

   methods: {
        isToday()
        {
            console.log(this.filter_logs.start_date, this.filter_logs.end_date, new Date().toISOString().split('T')[0], (this.filter_logs.start_date && this.filter_logs.end_date) === new Date().toISOString().split('T')[0]);
            if (this.filter_logs.start_date  === new Date().toISOString().split('T')[0] && this.filter_logs.end_date === new Date().toISOString().split('T')[0]) return true
            else return false
        },
         async exportToExcel()
        {    
           let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let file_name = "fever-logs_" + date + '.xls'
            let fields = [] , has_fever_data = [{}]
            for (let index = 0; index < this.has_fever_logs.length; index++) {
                has_fever_data.push({
                    "full_name": this.has_fever_logs[index].full_name,
                    "gender": this.has_fever_logs[index].gender,
                    "temperature": this.has_fever_logs[index].temperature,
                    "has_fever": this.has_fever_logs[index].has_fever ? "Yes" : this.has_fever_logs[index].has_fever,
                    "company_name": this.has_fever_logs[index].company_name,
                    "category": this.has_fever_logs[index].category,
                    "home_address" : this.has_fever_logs[index].home_address,
                    "date_logged" : this.has_fever_logs[index].date,
                },)
            }

            fields.push({
            label: 'Full name',
            value: 'full_name'
            },{
            label: 'Gender',
            value: 'gender'
            },{
            label: 'Temperature',
            value: 'temperature'
            },{
            label: 'Has Fever',
            value: 'has_fever'
            },{
            label: 'Company name',
            value: 'company_name'
            },{
            label: 'Category',
            value: 'category'
            },{
            label: 'Home address',
            value: 'home_address'
            },{
            label: 'Date logged',
            value: 'date_logged'
            });
    
            const { Parser } = require('json2csv');

            const json2csvParser = new Parser({fields , quote: '', delimiter: '\t'});
            const csv = json2csvParser.parse(has_fever_data);

            // var FileSaver = require('file-saver');
            // FileSaver.saveAs(
            // new Blob([csv], {
            //     type:
            //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            // }),
            // file_name
            // );

            
            // try {
            //     let ret = await Filesystem.mkdir({
            //     path: '/storage/self/primary/secrets',
            //     directory: FilesystemDirectory.Data,
            //     recursive: true // like mkdir -p
            //     });
            //     console.log("works");
            // } catch(e) {
            //     console.error('Unable to make directory', e);
            // }
            try {
                const result = await Filesystem.writeFile({
                path: file_name,
                data: csv,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
                })
                console.log('Wrote file', result);
            } catch(e) {
                console.error('Unable to write file', e);
            }

        },
       goToFilterLogs(){
            this.$router.push({
                name: "member_mobile_filter_fever",
                params: 
                {
                    filter: this.filter_logs
                }
            })
        },
        goToAddUserLogs(){
            this.$router.push({
                name: "member_mobile_add_fever"
            })
        },
        async getDevices()
        {
            let params = {}
            params = {find_device: {company_name: this.has_fever_logs.company_name}}
            this.device_list =  await this.$_post(postGetDevice, params);
        },
        deviceInfo(id, type)
        {
            for (let index = 0; index < this.device_list.data.length; index++) {
                if (this.device_list.data[index].device_id == id)
                if (type == 'name') return this.device_list.data[index].device_name
                else return this.device_list.data[index].log_type
            }
        },
        async getLogs()
        {
            let params = {company_id: {'$in' : this.filter_logs.company_list}}
            if ( this.filter_logs.account_type != 'All' ) params.category = this.filter_logs.account_type
            if ( this.filter_logs.device_name != 'All' ) params.device_id = this.filter_logs.device_name.value

            let sort_time_start = this.filter_logs.start_time.split(":")
            let sort_time_end = this.filter_logs.end_time.split(":")

            let date_start = ''
            if (this.has_fever_logs.length) {
                date_start = this.has_fever_logs[this.has_fever_logs.length -1].date_saved
            }
            else
            {
                date_start = new Date(this.filter_logs.start_date)
                date_start.setHours(sort_time_start[0])
                date_start.setMinutes(sort_time_start[1])
                date_start.setSeconds(sort_time_start[2] ? sort_time_start[2] : '00')
                date_start.setMilliseconds(sort_time_start[3] ? sort_time_start[3] : '00')
            }

            let date_end = new Date(this.filter_logs.end_date)
            date_end.setHours(sort_time_end[0])
            date_end.setMinutes(sort_time_end[1])
            date_end.setSeconds(sort_time_end[2] ? sort_time_end[2] : '00')

            params.date_saved = { '$gte' : new Date(date_start), '$lte' : new Date(date_end)}

            let {data: data} = await this.$_post(postGetMobileFeverLogs, {find_logs: params})
            for(let index = 0; index < data.length; index++) {
                data[index].date_string = date.formatDate(data[index].date_saved, 'MMM D YYYY - hh:mm A')
                this.has_fever_logs.push(data[index])
            }
            if ((this.count_staff + this.count_visitor) == 0)
            {
                if (params.category)
                {
                    if (params.category == 'Staff') this.count_staff = await this.getCount(params, 'Staff')
                    else if (params.category == 'Visitor') this.count_staff = await this.getCount(params, 'Visitor')
                }
                else
                {
                    this.count_staff = await this.getCount(params, 'Staff')
                    this.count_visitor = await this.getCount(params, 'Visitor')
                }
            }
            console.log(this.count_staff + this.count_visitor);
            if ((this.count_staff + this.count_visitor) > this.has_fever_logs.length ) await this.getLogs()
        },
        async getCount(params, category)
        {
            params.category = category
            let {data: count} = await this.$_post('member/count/mobile_fever_logs', {find_logs: params})
            return count.count
        },
   },
   
   updated() {},
   async mounted()
   {
       this.has_fever_logs = []
       this.count_staff = 0
       this.count_visitor = 0
       let company = {}
       if (this.$route.params.device_name)
        {
            this.filter_logs = this.$route.params
            this.filter_logs.company_list.push(this.$route.params.company._id)
            this.filter_logs.company_names.push({
                value: this.$route.params.company._id,
                label: this.$route.params.company.company_name
            })
            company = this.$route.params.company
        }
        else
        {
            this.filter_logs.company_list.push(this.$user_info.company._id)
            this.filter_logs.company_names.push({
                value: this.$user_info.company._id,
                label: this.$user_info.company.company_name
            })
            company = this.$user_info.company
        }
        if (company.tenants && company.tenants.length)
        {
            for (let index = 0; index < company.tenants.length; index++) {
                this.filter_logs.company_list.push(company.tenants[index])
                let tenant = await this.$_company({_id: company.tenants[index]})
                this.filter_logs.company_names.push({
                    value: company.tenants[index],
                    label: tenant[0].company_name
                })
            }
        }

        await this.getDevices();
        await this.getLogs()
       
   }
}
</script>
