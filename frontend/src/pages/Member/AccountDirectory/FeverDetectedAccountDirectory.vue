<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL FEVER DETECTED</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <!-- <q-select v-model="select__date" :options="options_date" outlined dense></q-select> -->
                <q-input label="Start Date" class="select-sm" v-model="start_date" type="date" outlined dense></q-input>
                <q-input label="End Date" class="select-sm" v-model="end_date" type="date" outlined dense></q-input>
                <q-btn @click="exportTableToExcel('tblData', 'fever_detected-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <q-table id="tblData" dense  flat :data="fever_detected.data" :pagination.sync="pagination" :columns="table_column"></q-table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import { postGetPersonLogs , postGetPerson, postPersonByCateg, postExpFeverDeteted} from '../../../references/url';

export default {
    components: {
        DailyLogCards
    },
    data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        pagination: {
            rowsPerPage: 10,
        },
        select__id_type: '',
        select__date: '',
        fever_detected: [],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        table_column:
        [
            { 
                name    : 'full_name',
                label   : 'Name',
                field   : row => row.full_name,
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'gender',
                label   : 'Gender',
                field   : row => row.gender ? row.gender : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'age',
                label   : 'Age',
                field   : row => row.birthday ? new Date().getFullYear() - new Date(row.birthday).getFullYear() : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'home_address',
                label   : 'Home Address',
                field   : row => row.home_address ? row.home_address : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'company_name',
                label   : 'Company Name',
                field   : row => row.company_name ? row.company_name : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'date_detected',
                label   : 'Date Detected',
                field   : row => row.date_logged ? row.date_logged : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'temperature',
                label   : 'Temperature',
                field   : row => row.temperature ? row.temperature : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
        ],
    }),
    watch:
    {
       async start_date(val)
        {
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            await this.getDetectedFever({find_by_category: {has_fever: true, date_saved: {$gt: start, $lt: end}}})  
        },
        async end_date(val)
        {
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            await this.getDetectedFever({find_by_category: {has_fever: true, date_saved: {$gt: start, $lt: end}}}) 
        }
    },
    methods:{
         async exportTableToExcel(tableID, filename = ''){
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            let file_name = 'feverdetected_' + date + '.xlsx'
            // if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Staff', file_name: file_name, find_data: {company_name: this.company_details.company_name, has_fever: true, date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)}}}
            params = {user_name: this.$user_info.full_name, work_sheet: 'Fever Detected',file_name: file_name, find_data: {has_fever: true, date_saved: { '$gt' : start , '$lt' : end}}}
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
        async getDetectedFever(params = {})
        {
            this.fever_detected = await this.$_post(postPersonByCateg, params);
        }
    },
    async mounted(){
        let start = new Date(this.start_date)
        let end = new Date(this.end_date)
        end = end.setDate(end.getDate() + 1)
        // start = start.setDate(start.getDate() - 1)

        await this.getDetectedFever({find_by_category: {has_fever: true, date_saved: {$gt: start, $lt: end}}}) 
        // await this.getDetectedFever({find_by_category: {has_fever: true}})
    }
}
</script>
