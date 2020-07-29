<template>
    <div class="report">
        <div class="report__header" style="margin-bottom: 15px !important;">
            <div class="header__title">FEVER MONITORING REPORTS</div>
            <div class="header__filter">
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
                <!-- <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select> -->
                <q-btn @click="exportTableToExcel('tblData', 'visitor-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__header">
            <div class="header__filter">
                <q-input label="Start Date" v-model="start_date" type="date" outlined dense></q-input>
                <q-input label="End Date" v-model="end_date" type="date" outlined dense></q-input>
                <q-btn flat dense no-caps class="btn-primary btn-sort" label="Sort">
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
        <div class="report__container">
            <div id="tblData" v-for="(person, index) in this.fever_logs" :key="index" class="report__content content__card">
                <q-img :src="person.person_img"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>{{person.full_name}}</span> is on the <span>{{getFeverDate(person.date_saved)}}</span> after abnormal temperature was detected.
                    </div>
                    <!-- <div class="report__info-datetime">{{timeAgo(person.date_saved)}}</div> -->
                </div>
            </div>
            <!-- <div class="report__content content__card">
                <q-img src="https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>Armando M. dela Cruz</span> is on the <span>10th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="report__info-datetime">1 day ago</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import './Report.scss';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import {postPersonByCateg, postExpFeverDeteted} from '../../../references/url';


export default {
    components: { ComPicker },
     data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        select__company: '',
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        company_details: {},
        fever_logs: [],
        sort_item: 'Date Created',
        sort_options: ['Date Logged', 'Full Name', 'Temperature'],
        sort: '1'
    }),

    watch:
    {
        async start_date(val)
        {
            if (val)
            {
                await this.getFeverList()
            }
        },
        async end_date(val)
        {
            if (val)
            {
                await this.getFeverList()
            }
        }
    },

    methods:
    {
        timeAgo(date)
        {
            date = new Date(date).getTime();
            let sec = date / 1000
            return this.$_timeAgo(sec)
        },

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

            // let params = this.sortOption()
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)
            // end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)
            // (await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params));
            if (this.company_details)
            this.getFeverList();
            else
            this.getFeverList();

            // await this.getPersonWithFever({find_by_category: {has_fever: true, date_saved: {$gt: start, $lt: end}}, sort: params})
        },

        async exportTableToExcel(tableID, filename = ''){
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)

            start = start.setDate(start.getDate() - 1)
            end = end.setDate(end.getDate() + 1)

            let file_name = 'fevermonitoringreport_' + date + '.xlsx'
            if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Fever Monitoring Report', file_name: file_name, find_data: {company_name: this.company_details.company_name, has_fever: true, date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)}}}
            else params = {user_name: this.$user_info.full_name, work_sheet: 'Fever Monitoring Report',file_name: file_name, find_data: {has_fever: true, date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)}}}
            let is_saved = await this.$_post(postExpFeverDeteted,params);

            if (is_saved)
            {
                this.$q.notify(
                {
                    color: 'green',
                    message: 'File was successfully saved'
                });
            }
            // var downloadLink;
            // var dataType = 'application/vnd.ms-excel';
            // var tableSelect = document.getElementById(tableID);
            // var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

            // // Specify file name
            // filename = filename?filename+'.xls':'excel_data.xls';

            // // Create download link element
            // downloadLink = document.createElement("a");

            // document.body.appendChild(downloadLink);

            // if(navigator.msSaveOrOpenBlob){
            //     var blob = new Blob(['\ufeff', tableHTML], {
            //         type: dataType
            //     });
            //     navigator.msSaveOrOpenBlob( blob, filename);
            // }else{
            //     // Create a link to the file
            //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            //     // Setting the file name
            //     downloadLink.download = filename;

            //     //triggering the function
            //     downloadLink.click();
            // }
        },
        getFeverDate(date)
        {
            let current = new Date()
            date = new Date(date)
            const diffTime = Math.abs(current - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays);
            if (diffDays % 10 == 1) return String(diffDays) + 'st day'
            else if (diffDays % 10  == 2) return String(diffDays) + 'nd day'
            else if (diffDays % 10  == 3) return String(diffDays) + 'rd day'
            else return String(diffDays) + 'th day'

        },

        async getCompanyData(value)
        {
            this.company_details = value
            await this.getFeverList()
        },

        async getFeverList()
        {
            let sort_options = this.sortOption()
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)

            start = start.setDate(start.getDate() - 1)
            end = end.setDate(end.getDate() + 1)
            let params = {}
            if (this.company_details || this.company_details.company_name == 'All Company') {
                params = {sort: sort_options, find_by_category: {date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)},
                has_fever: true,
                company_id: this.company_details._id},
                limit: 10}
            }
            else params = {sort: sort_options, find_by_category: {date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)},
                has_fever: true},
                limit: 10}

            let data = await this.$_post(postPersonByCateg, params);
            this.fever_logs = data.data
        }
    },

    async mounted()
    {
        await this.getFeverList()
    }
}
</script>
