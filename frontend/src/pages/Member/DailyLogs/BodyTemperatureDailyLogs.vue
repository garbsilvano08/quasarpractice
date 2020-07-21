<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">BODY TEMPERATURE LOGS</div>
            <div class="header__filter">
                <q-btn @click="exportTableToExcel" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="header__filter">
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(staff, index) in this.daily_logs.data" :key="index">
                <DailyLogCards :staff_logs="staff"></DailyLogCards>
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

import { postGetCompanies, postFindLogs, postPersonByCateg, postExpFeverDeteted } from '../../../references/url';

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        select__id_type: '',
        select__date: new Date().toISOString().split('T')[0],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        daily_logs: [],
        company_details: ''
    }),
     watch:
    {
        async select__date(val)
        {
            if (val) 
            {
                if (this.company_details)
                this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id});
                else 
                this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]});
            }
        }
    },
    methods:{
        async exportTableToExcel(tableID, filename = ''){
            let date = new Date(this.select__date).toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)

            // start = start.setDate(start.getDate() - 1)
            // end = end.setDate(end.getDate() + 1)

            let file_name = 'bodytempdailylogs_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Body Temperature Logs', file_name: file_name, find_data: {company_name: this.company_details.company_name, date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Body Temperature Logs',file_name: file_name, find_data: {date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            let is_saved = await this.$_post(postExpFeverDeteted,params);

            if (is_saved) 
            {
                this.$q.notify(
                {
                    color: 'green',
                    message: 'File was successfully saved'
                });
            }
        },
        async getLogs(params)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params});
        },
        async getCompanyData(value)
        {
            this.company_details = value
            if (value) this.daily_logs = await this.getLogs({ date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: value._id});
            else this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]});
        },
    },
    async mounted()
    {
         this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]});
        // this.daily_logs = data.data
    }
}
</script>
