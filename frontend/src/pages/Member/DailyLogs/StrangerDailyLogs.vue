<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <com-picker @select=getCompanyData></com-picker>
                 <q-btn  @click="exportTableToExcel('tblData', 'visitor-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_company" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">STRANGERS</div>
            <div class="header__filter">
                <!-- <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input> -->
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
            <div v-for="(staff, index) in this.staff_list.data" :key="index">
            <DailyLogCards :staff_logs="staff"></DailyLogCards>
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
import { log } from 'util';
import { base64StringToBlob } from 'blob-util';

export default {
    components: {
        DailyLogCards,
        ComPicker

    },
    data: () => ({
        staff_list: {},
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
        sort_item: 'Date Saved',
        sort_options: ['Date Saved', 'Full Name', 'Temperature'],
        sort: '-1'
    }),

     watch:
    {
        async select__date(val)
        {
            if (val)
            {
                let params = this.sortOption()
                if (this.company_details) this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params)
                else this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
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

            if (this.company_details) this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params)
            else this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
        },

        async exportTableToExcel(tableID, filename = ''){
            let date = new Date(this.select__date).toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)

            // start = start.setDate(start.getDate() - 1)
            // end = end.setDate(end.getDate() + 1)

            let file_name = 'strangersdailylogs_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Stranger Daily Logs', file_name: file_name, find_data: {company_name: this.company_details.company_name, category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Stranger Daily Logs',file_name: file_name, find_data: {category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0]}}
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
            if (value) this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: value._id}, params)
            else this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params)
        },

        async getStaffList(params, sort)
        {
            let index = 0
            let log_list = await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort});
            for (let index = 0; index < log_list.data.length; index++) {                
                log_list.data.forEach(async log => {
                    if (!log.person_img.startsWith('http')) 
                    {
                        let imageName = 'vision-' + Date.now().toString() + ".png"
                        let blob = "";
                        var formDatatoBackend = new FormData();
                        let contentType = 'image/png';
                        blob = "";
                        blob = base64StringToBlob(log.person_img, contentType);
                        blob.lastModifiedDate = new Date();
                        formDatatoBackend.append('image', blob, imageName);
                        let res
                        try
                        {
                            res = await this.$_post_file(formDatatoBackend);
                            log_list.data[index].person_img = res
                            await this.$_post('member/save/image', {info: {id: log._id, image: res}});
                        }
                        catch(e){}

                        console.log(res);
                    }
                    index++
                    // console.log(element);
                });
            }
            // log_list
            return log_list
        }
    },
    async mounted()
    {
        this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: this.select__date}, {date_saved: -1})
    }
}
</script>
