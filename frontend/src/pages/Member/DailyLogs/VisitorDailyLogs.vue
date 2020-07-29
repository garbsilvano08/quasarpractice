<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <q-btn @click="exportTableToExcel('tblData', 'visitor-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">VISITOR</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>
                <q-btn flat dense no-caps class="btn-primary btn-filter" label="Sort">
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
                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(visitor, index) in this.visitor_list.data" :key="index">
            <DailyLogCards :staff_logs="visitor"></DailyLogCards>
            <!-- <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards> -->
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
        ComPicker,
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
        visitor_list: [],
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
                if (this.company_details) this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params)
                else this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
            }
        }
    },

    methods:
    {
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

            if (this.company_details) this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params)
            else this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
        },

        async exportTableToExcel(tableID, filename = ''){
            let sort_options = this.sortOption()
            let date = new Date(this.select__date).toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)

            // start = start.setDate(start.getDate() - 1)
            // end = end.setDate(end.getDate() + 1)

            let file_name = 'visitorsdailylogs_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Visitors Daily Logs', file_name: file_name, sort: sort_options, find_data: {company_name: this.company_details.company_name, category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Visitors Daily Logs',file_name: file_name, sort: sort_options, find_data: {category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
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
            let params = this.sortOption()
            this.company_details = value
            // this.getTotalScannedToday(new Date(), value._id)
            if (this.company_details) this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id},params)
            else this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
        },

        async getVisitorList(params, sort)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort});
        }
    },
    async mounted()
    {
        this.visitor_list = await this.getVisitorList({category: 'Visitors', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, {date_saved: -1})
    }
}
</script>
