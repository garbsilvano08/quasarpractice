<template>
   <div class="dashboard">

      <div class="dashboard__overview">
         <div class="dashboard__graph">
         <!-- VISITORS PURPOSE NEW PIE CHART-->
            <div class="dashboard__graph-item">
                <div class="dashboard__graph-content dashboard__graph-pie">
                <div class="dashboard__pie-chart">
                    <pie-chart
                        :donut="true"
                        :legend="false"
                        width="150px"
                        height="150px"
                        :colors="[
                            '#972CF3',
                            '#FF8B29',
                            '#EDFF00',
                            '#2F84FF',
                            '#27E4AB',
                            '#00B347',
                        ]"
                        :data="{
                            'Official Business': 0,
                            'Collection & Pickup': 6,
                            'Delivery': 0,
                            'Corporate Meeting': 4,
                            'Client/Customer': 0,
                            'Guest': 0,
                        }"
                        :library="{cutoutPercentage: 85}">
                    </pie-chart>
                    <div class="dashboard__pie-total">
                        <div class="pie-total__amount">10</div>
                        <div class="pie-total__label">Fever Logs</div>
                    </div>
                </div>

                <div class="dashboard__pie-legend">
                    <div class="pie-legend__item">
                        <div class="pie-legend__color fourth-color"></div>
                        <div class="pie-legend__percent">Staff (4)</div>
                    </div>
                    <div class="pie-legend__item">
                        <div class="pie-legend__color second-color"></div>
                        <div class="pie-legend__percent">Visitor (6)</div>
                    </div>
                </div>
                <q-btn class="btn-primary" flat dense no-caps @click="exportToExcel">Export</q-btn>
                </div>
            </div>
         </div>
        </div>
    
      <div class="dashboard__overview-logs">
        
        <div class="header__title">Fever Logs  <q-icon class="icon-float" name="fas fa-sliders-h" @click="goToFilterLogs"/></div>
         <div class="content__card-info content__card" v-for="(logs, index) in this.has_fever_logs.data" :key="index">
            <div class="content__info">
                <div class="flex flex-center">
                    <q-img :src="logs.person_img"></q-img>
                </div>
            <div class="content__temperature">
                {{logs.temperature}}<br>
                <span class="abnormal-temperature">Has fever</span>
                <!-- <span class="normal-temperature" v-if="!logs.has_fever">Normal</span> -->
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
                   <label>Date & Time:</label> {{logs.date_saved}}
                </div>
            </div>
         </div>
        <!-- <div class="content__card-info content__card">
            <div class="content__info">
                <div class="flex flex-center">
                    <q-img src=""></q-img>
                </div>
            <div class="content__temperature">
                37<br>
                <span class="abnormal-temperature">Has fever</span>
                <span class="normal-temperature" v-if="!data.has_fever">Normal</span>
            </div>
            </div>
            <div class="content__info">
                <div class="content__name">
                    Juan Dela Cruz <br>
                    <span>Staff</span>
                </div>
                <div class="content__location">
                    <label>Tagged to:</label> Green Sun
                </div>
                <div class="content__room">
                    <label>Device Scanned:</label> Vision Sky - Public
                </div>
                <div class="content__datetime">
                   <label>Date & Time:</label> Sep 11 2020 - 5:45:12 PM
                </div>
            </div>
         </div> -->
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

Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },
   //pointerdata
   data:() =>
   ({
      has_fever_logs: {},
      device_list: {}
   }),

   watch:{},

   methods: {
       exportToExcel()
       {    
           let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let file_name = "fever-logs_" + date + '.xls'

            let fields = [] , has_fever_data = [{}]
            for (let index = 0; index < this.has_fever_logs.data.length; index++) {
                has_fever_data.push({
                    "full_name": this.has_fever_logs.data[index].full_name,
                    "gender": this.has_fever_logs.data[index].gender,
                    "temperature": this.has_fever_logs.data[index].temperature,
                    "has_fever": this.has_fever_logs.data[index].has_fever ? "Yes" : this.has_fever_logs.data[index].has_fever,
                    "company_name": this.has_fever_logs.data[index].company_name,
                    "category": this.has_fever_logs.data[index].category,
                    "home_address" : this.has_fever_logs.data[index].home_address,
                    "date_logged" : this.has_fever_logs.data[index].date,
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

            var FileSaver = require('file-saver');
            FileSaver.saveAs(
            new Blob([csv], {
                type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }),
            file_name
            );
       },
       goToFilterLogs(){
            this.$router.push({
                name: "member_mobile_filter_fever"
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
   },
   
   updated() {},
   async mounted()
   {
       this.has_fever_logs = await this.$_post(postGetMobileFeverLogs)
        for(let index = 0; index < this.has_fever_logs.data.length; index++) {
            this.has_fever_logs.data[index].date_saved = date.formatDate(this.has_fever_logs.data[index].date_saved, 'MMM D YYYY - hh:mm:ss A')
        }
        await this.getDevices();
   }
}
</script>
