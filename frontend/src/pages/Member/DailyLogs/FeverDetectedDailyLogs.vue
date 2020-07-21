<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <q-btn @click="exportTableToExcel('tblData', 'visitor-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_company" outlined dense></q-select> -->
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">FEVER DETECTED</div>
            <div class="header__filter">
                <!-- <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input> -->
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>

                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(staff, index) in this.personWithFever" :key="index">
            <DailyLogCards :staff_logs="staff"></DailyLogCards>
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

import { postGetCompanies, postFindLogs, postPersonByCateg, postExpFeverDeteted } from '../../../references/url';

export default {
    components: {
        DailyLogCards, 
        ComPicker
    },
    data: () => ({
        staff_list: {},
        personWithFever : [],
        company_list: [],
        options_company: ['All Company'],
        select__id_type: 'All Company',
        select__date: new Date().toISOString().split('T')[0],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        company_details: '',
    }),

     watch:
    {
        async select__date(val)
        {
            if (val) 
            {
                if (this.company_details)
                this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}));
                else 
                this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}));
            }
        }
    },

    methods:
    {
        async exportTableToExcel(tableID, filename = ''){
            let date = new Date(this.select__date).toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)

            // start = start.setDate(start.getDate() - 1)
            // end = end.setDate(end.getDate() + 1)

            let file_name = 'feverdetecteddailylogs_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Fever Detected Logs', file_name: file_name, find_data: {company_name: this.company_details.company_name, has_fever: true, date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Fever Detected Logs',file_name: file_name, find_data: {has_fever: true, date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
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

        async getCompanyData(value)
        {
            this.company_details = value
            // this.getTotalScannedToday(new Date(), value._id)
            if (this.company_details) this.getPersonWithFever(await this.getStaffList({ date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: value._id}));
            else this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}));
        },

        async getStaffList(params)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params});
        },
        async getPersonWithFever(logs)
        {
            this.personWithFever = [];
            // let logs = await this.$_post(postGetPersonLogs, );
            logs = logs.data;
            logs.forEach(async person => {   
            if(person.has_fever)
            {
                this.personWithFever.push(person);
                
            }
        });
        },
    },
    async mounted()
    {
        this.getPersonWithFever(await this.getStaffList({date_logged: (new Date().getFullYear())+ '-' +(new Date().getMonth()+1).toString().padStart(2, "0")+'-'+new Date().getDate().toString().padStart(2, "0")}));
    }
}
</script>
