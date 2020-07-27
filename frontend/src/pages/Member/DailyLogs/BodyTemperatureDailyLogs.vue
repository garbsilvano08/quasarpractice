<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">BODY TEMPERATURE LOGS</div>
            <div class="header__filter">
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <q-btn @click="exportTableToExcel" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="header__filter">
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>
                <q-btn flat dense no-caps class="btn-primary btn-filter" label="Filter">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <div class="q-gutter-sm">
                                <q-radio v-model="sort" val="1" label="Ascending" />
                                <q-radio v-model="sort" val="-1" label="Descending" />
                            </div>
                            <q-separator />
                            <q-item @click="sortItem(option)" v-for="(option, index) in this.sort_options" :key="index" clickable v-close-popup>
                                <q-item-section>{{option}}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
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
        company_details: '',
        sort_item: 'Date Saved',
        sort_options: ['Date Logged', 'Full Name', 'Temperature'],
        sort: '1'
    }),
     watch:
    {
        async select__date(val)
        {
            if (val)
            {
                let params = this.sortOption()
                if (this.company_details)
                this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params);
                else
                this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params);
            }
        }
    },
    methods:{
        sortOption()
        {
            let params = {}
            if (this.sort_item == 'Date Saved') params = {date_saved: Number(this.sort)}
            else if (this.sort_item == 'Full Name') params = {full_name: Number(this.sort)}
            else if (this.sort_item == 'Temperature') params = {temperature: Number(this.sort)}
            return params
        },

        async sortItem(option)
        {
            this.sort_item = option
            let params = this.sortOption()

            if (this.company_details)
            this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params);
            else
            this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params);
        },

        async exportTableToExcel(tableID, filename = ''){
            let sort_options = this.sortOption()
            let date = new Date(this.select__date).toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)

            // start = start.setDate(start.getDate() - 1)
            // end = end.setDate(end.getDate() + 1)

            let file_name = 'bodytempdailylogs_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Body Temperature Logs', file_name: file_name, sort: sort_options, find_data: {company_name: this.company_details.company_name, date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Body Temperature Logs',file_name: file_name, sort: sort_options, find_data: {date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
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
        async getLogs(params, sort)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort});
        },
        async getCompanyData(value)
        {
            let params = this.sortOption()
            this.company_details = value
            if (value) this.daily_logs = await this.getLogs({ date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: value._id}, params);
            else this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params);
        },
    },
    async mounted()
    {
         this.daily_logs = await this.getLogs({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, {date_saved: -1});
        // this.daily_logs = data.data
    }
}
</script>
