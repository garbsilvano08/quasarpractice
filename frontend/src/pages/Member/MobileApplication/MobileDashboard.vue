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
                            '#FF8B29',
                            '#2F84FF',
                        ]"
                        :data="{
                            'Staff': count_staff,
                            'Visitor': count_visitor,
                        }"
                        :library="{cutoutPercentage: 85}">
                    </pie-chart>
                    <div class="dashboard__pie-total">
                        <div class="pie-total__amount">{{count_staff + count_visitor}}</div>
                        <div class="pie-total__label">Fever Logs</div>
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
                <q-btn class="btn-primary" flat dense no-caps>Export</q-btn>
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

Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },
   //pointerdata
   data:() =>
   ({
        count_staff: 0,
        count_visitor: 0,
        has_fever_logs: {},
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
   }),

   watch:{},

   methods: {
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
            if ( this.filter_logs.device_name != 'All' ) params.device_id = this.filter_logs.device_name.device_id

            let sort_time_start = this.filter_logs.start_time.split(":")
            let sort_time_end = this.filter_logs.end_time.split(":")

            let date_start = new Date(this.filter_logs.start_date)
            date_start.setHours(sort_time_start[0])
            date_start.setMinutes(sort_time_start[1])
            date_start.setSeconds(sort_time_start[2] ? sort_time_start[2] : '00')
            date_start.setMilliseconds(sort_time_start[3] ? sort_time_start[3] : '00')

            let date_end = new Date(this.filter_logs.end_date)
            date_end.setHours(sort_time_end[0])
            date_end.setMinutes(sort_time_end[1])
            date_end.setSeconds(sort_time_end[2] ? sort_time_end[2] : '00')

            params.date_saved = { '$gte' : date_start, '$lte' : date_end}

            this.has_fever_logs = await this.$_post(postGetMobileFeverLogs, {find_logs: params})
            for(let index = 0; index < this.has_fever_logs.data.length; index++) {
                this.has_fever_logs.data[index].date_saved = date.formatDate(this.has_fever_logs.data[index].date_saved, 'MMM D YYYY - hh:mm:ss A')
            }
            
            
            this.count_staff = await this.getCount(params, 'Staff')
            this.count_visitor = await this.getCount(params, 'Visitor')
        },
        async getCount(params, category)
        {
            params.category = category
            let {data: count} = await this.$_post('member/count/mobile_fever_logs', {find_logs: params})
            return count.count
        }
   },
   
   updated() {},
   async mounted()
   {
       let company = {}
       if (this.$route.params && this.$route.params.filter_logs)
        {
            this.filter_logs = {
                start_date: this.$route.params.start_date,
                end_date: this.$route.params.end_date,
                start_time: this.$route.params.start_time,
                end_time: this.$route.params.end_time,
                account_type: this.$route.params.account_type,
                device_name: this.$route.params.device_name
            }
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
        await this.getLogs()

        await this.getDevices();
   }
}
</script>
