<template>
    <div class="report">
        <div class="report__header" style="margin-bottom: 15px !important;">
            <div class="header__title">FOOT TRAFFIC REPORT</div>
            <div class="header__filter">
                <com-picker :user="this.$user_info" class="btn-choose" @select=getCompanyDatas></com-picker>
                <q-btn @click="exportTableToExcel('tblData', 'fever-detected')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__header">
            <div class="header__filter">
                <!-- <q-input label="From" v-model="start__date" type="date" outlined dense></q-input>
                <q-input label="To" v-model="end__date" type="date" outlined dense></q-input> -->
                <q-select v-model="select_people" :options="options_people" outlined dense></q-select>
                <q-select @select="getFootTraffic()" v-model="select_date" :options="options_date" outlined dense></q-select>
            </div>
        </div>
        <div class="report__container content__box">
            <line-chart
                :data="data_line_graph.data"
                :colors="[
                    '#4151b3',
                    '#9825f2',
                    '#fd8e22',
                    '#f8fe22',
                    '#2089fe',
                    '#23dea7',
                    '#00af50',
                ]"
            />
        </div>
        <q-dialog v-model="date_filter_dialog" persistent>
               <q-card>
                  <q-card-section>
                  <div class="text-h6">Custom Date</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                     <q-input v-model="start__date" type='date' outlined dense></q-input>
                     <q-input v-model="end__date" type='date' outlined dense></q-input>
                  </q-card-section>

                  <q-card-actions align="right">
                     <q-btn @click="date_filter_dialog = false, select_date = last_option" flat label="Cancel" color="primary" v-close-popup />
                     <q-btn @click="getCustomTraffic" flat label="Search" color="primary" v-close-popup />
                  </q-card-actions>
               </q-card>
         </q-dialog>
    </div>
</template>

<script>
import './Report.scss';
import { postGetPersonLogs , postGetPerson, postPersonByCateg, postExpFeverDeteted}                        from '../../../references/url';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import { log } from 'util';
import LoginVue from '../../Front/Login.vue';

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export default {
    components: {
        ComPicker,
    },
     data: () => ({
        select_date: 'Daily',
        options_date: [
            'Daily' , 'Weekly', 'Monthly' , 'Yearly', 'Custom Date'
        ],
        select_people: 'All',
        options_people: [
            'All' , 'Staff', 'Visitor', 'Stranger'
        ],
        date_filter_dialog: false,
        company_details: {},
        start__date: new Date().toISOString().split('T')[0],
        end__date: new Date().toISOString().split('T')[0],
        data_line_graph:
        {data: [
            {
                name: 'Employee', data: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 3, 'Thrusday': 6, 'Friday': 8}
            },
            {
                name: 'Visitor', data: {'Monday': 3, 'Tuesday': 4, 'Wednesday': 7, 'Thrusday': 6, 'Friday': 5,}
            }
        ]},
    }),
    async mounted()
    {
        this.company_details = this.$user_info.company ? this.$user_info.company : {}
        let params = {}
        if (this.company_details) params = {filter: {current_date: new Date(), company_id: this.company_details._id,date_filter: this.select_date , person: this.select_people}}
        else params = {filter: {current_date: new Date(), date_filter: this.select_date, person: this.select_people}}
        await this.getTrafficData(params)
    },
     watch:
    {
        async select_date(val, old)
        {
           this.last_option = old
           if (val == 'Custom Date')
           {

              this.date_filter_dialog = true
           }
           else
           {
              if (this.company_details._id) await this.getTrafficData({filter: {current_date: new Date(), company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
              else await this.getTrafficData({filter: {current_date: new Date(), date_filter: this.select_date , person: this.select_people}})
           }
        },
        async select_people(val)
        {
           if (this.select_date == 'Custom Date')
           {
              await this.getCustomTraffic()
           }
           else
           {
              if (this.company_details._id) await this.getTrafficData({filter: {company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
              else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people}})
           }
         //   await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people}})
        },
    },
    methods:
    {
        async getCustomTraffic()
        {
            let data
            if (new Date(this.start__date) <= new Date(this.end__date))
            {
                if (this.company_details._id) await this.getTrafficData({filter: {start_date: this.start__date, end_date: this.end__date, company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
                else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people, end_date: this.end__date, start_date: this.start__date}})
                // this.date_filter_dialog = false
            }
            else
            {
                // this.select_date = this.last_option
                this.$q.notify(
                    {
                        color: 'red',
                        message: 'Invalid date'
                });
            }
            this.date_filter_dialog = false
        },

        async getFootTraffic()
        {
            if (this.select_date == 'Custom Date')
            {
                
                this.date_filter_dialog = true
            }
            else
            {
                if (this.company_details._id) await this.getTrafficData({filter: {current_date: new Date(), company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
                else await this.getTrafficData({filter: {current_date: new Date(), date_filter: this.select_date , person: this.select_people}})
            }
            // this.last_option = this.select_date
        },
        async getTrafficData(params = {}, type)
        {
            if (type == 'Registered') return await this.$_post('member/dashbord/counting', params);
            else this.data_line_graph = await this.$_post('member/dashbord/counting', params);
        },
        getCompanyDatas(value)
        {
            this.company_details = value
        },

        async exportTableToExcel(tableID, filename = ''){
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let file_name = this.select_date + 'foottrafficreport_' + date + '.xls'
            
            let fields = [] , person_with_fever_data = [{}]
            
            for (let index = 0; index < this.data_line_graph.data.length; index++) {
                if (this.data_line_graph.data[index].name == this.select_people)
                {
                    let report_list = Object.entries(this.data_line_graph.data[index].data)
                    
                    for (let x = 0; x < report_list.length; x++) {
                        person_with_fever_data.push({
                            date_time: report_list[x][0],
                            value: report_list[x][1],
                        })
                        
                    }
                }
            }
            fields.push({
                label: 'Date/Time',
                value: 'date_time'
            },
            {
                label: 'Value',
                value: 'value'
            },);

            const { Parser } = require('json2csv');

            const json2csvParser = new Parser({fields , quote: '', delimiter: '\t'});
            const csv = json2csvParser.parse(person_with_fever_data);
    
            var FileSaver = require('file-saver');
            FileSaver.saveAs(
            new Blob([csv], {
                type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }),
            file_name
            );
        },
    },

}
</script>
