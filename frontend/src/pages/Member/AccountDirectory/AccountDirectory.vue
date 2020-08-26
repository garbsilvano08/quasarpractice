<template>
    <div class="account-directory">
        <div class="account-directory__header" style="margin-bottom: 15px !important;">
            <div class="header__title">ACCOUNT DIRECTORY</div>
            <div class="header__filter">
                <com-picker :user="this.$user_info" class="btn-choose" @select=getCompanyData></com-picker>
                <q-btn @click="exportTableToExcel('tblData', 'staff-list')" class="btn-primary btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__header">
            <div class="header_filter">
                <q-select label="Account Type" v-model="select__account_type" :options="options_account_type" outlined dense></q-select>
                <q-input label="Start Date" class="select-sm" v-model="start_date" type="date" outlined dense></q-input>
                <q-input label="End Date" class="select-sm" v-model="end_date" type="date" outlined dense></q-input>
                <q-btn label="Generate" @click="generateResult" class="btn-primary btn-export" flat dense no-caps/>
                
                <!-- <q-btn flat dense no-caps class="btn-outline btn-sort" label="Sort">
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
                </q-btn> -->
                
            </div>
            <div class="header__filter">
                <q-input outlined dense v-model="search" @keyup.exact.native="searchKeyPress()" placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="account-directory__header">
            <div class="header_filter">
                <q-btn-dropdown class="btn-dropdown__primary" label="Sort By" flat dense no-caps>
                    <q-list>
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-radio v-model="sort_type" val='1' dense label="Ascending" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-radio v-model="sort_type" val='-1' dense label="Descending" />
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-checkbox v-model="checkbox_date_saved" dense label="Date Saved" />
                            </q-item-section>
                        </q-item>
                            <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-checkbox v-model="checkbox_name" dense label="Name" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-checkbox v-model="checkbox_temperature" dense label="Temperature" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>

        <div class="account-directory__container content__box">
            <div class="content__table">
                <q-table id="tblData" dense @row-click="checkAccount" :filter="search" flat :data="this.staff_list.data" :pagination.sync="pagination" :columns="table_column"></q-table>

            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";
import { saveAs } from 'file-saver';
// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

// References
import { postGetStaff, postGetPersons, postGetLogs, postExpPerson } from '../../../references/url';
// import { start } from 'repl';

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        search : "",
        pagination: {
            rowsPerPage: 10,
        },
        select__id_type: '',
        select__date: '',
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        staff_list: [],
        select__account_type: 'All',
        options_account_type: [
            'All', 'Staff', 'Visitor'
        ],
        table_column:
        [
            {
                name    : 'full_name',
                label   : 'Name',
                field   : row => row.given_name +" " + row.middle_name +" "+row.last_name,
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'category',
                label   : 'Account Type',
                field   : row => row.category ? row.category : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'gender',
                label   : 'Gender',
                field   : 'gender',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'age',
                label   : 'Age',
                field   : row => new Date().getFullYear() - new Date(row.birthday).getFullYear(),
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
                name    : 'date_created',
                label   : 'Date Registered',
                field   : row => row.date_created ? new Date(row.date_created).toISOString().split('T')[0] : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],
        sort_item: 'Date Created',
        sort_options: ['Date Created', 'Last Name', 'First Name', 'Middle Name'],
        sort: '1',
        company_details: {},
        checkbox_date_saved: '',
        checkbox_name: '',
        checkbox_temperature: '',
        sort_type: '1'
    }),
    watch:
    {
        async start_date(val)
        {

            // await this.getStaffList()
        },
        async end_date(val)
        {
            // let params = this.sortOption()
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)
            // end = end.setDate(end.getDate() + 1)
            // // start = start.setDate(start.getDate() - 1)

            // await this.getStaffList()
        }
    },

    methods:
    {
        async generateResult()
        {
            await this.getStaffList()
        },
        getCompanyData(value)
        {
            this.company_details = value
        },
        sortOption()
        {
            let params = {}
            if (this.sort_item == 'Date Created') params = {date_created: Number(this.sort)}
            else if (this.sort_item == 'Last Name') params = {last_name: Number(this.sort)}
            else if (this.sort_item == 'First Name') params = {given_name: Number(this.sort)}
            else if (this.sort_item == 'Middle Name') params = {middle_name: Number(this.sort)}
            return params
        },

        async sortItem(option)
        {
            // this.sort_item = option
            // let params = this.sortOption()

            // // let params = this.sortOption()
            // let start = new Date(this.start_date)
            // let end = new Date(this.end_date)
            // end = end.setDate(end.getDate() + 1)
            // // start = start.setDate(start.getDate() - 1)

            // await this.getStaffList({find_person: {category: 'Staff', date_created: {$gt: start, $lt: end}}, sort: params})
        },

        async exportTableToExcel(tableID, filename = ''){
            let sort_options = this.sortOption()
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)
    
            let file_name = this.select__account_type+"_" + date + '.xls'
            // if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Staff', file_name: file_name, find_data: {company_name: this.company_details.company_name, has_fever: true, date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)}}}
            // params = {user_name: this.$user_info.full_name, work_sheet: 'Staff',file_name: file_name,sort: sort_options, find_data: {category: 'Staff', date_created: { '$gt' : start , '$lt' : end}}}
            // let is_saved = await this.$_post(postExpPerson,params);
            // console.log(this.staff_list.data);
            let fields = [] , staff_data = [{}]
            for (let index = 0; index < this.staff_list.data.length; index++) {
                staff_data.push({
                    "last_name": this.staff_list.data[index].last_name,
                    "given_name": this.staff_list.data[index].given_name,
                    "middle_name": this.staff_list.data[index].middle_name,
                    "gender": this.staff_list.data[index].gender,
                    "birthday" : this.staff_list.data[index].birthday,
                    "nationality" : this.staff_list.data[index].nationality,
                    "company_name" : this.staff_list.data[index].company_name,
                    "category" : this.staff_list.data[index].category,
                    "contact_number" : this.staff_list.data[index].contact_number,
                    "home_address" : this.staff_list.data[index].home_address,
                    "emergency_contact" : this.staff_list.data[index].emergency_contact
                },)
            }
            
            fields.push({
            label: 'Last name',
            value: 'last_name'
            },{
            label: 'Given name',
            value: 'given_name'
            },{
            label: 'Middle name',
            value: 'middle_name'
            },{
            label: 'Gender' ,
            value: 'gender'
            },{
            label: 'Birthday' ,
            value: 'birthday'
            },{
            label: 'Nationality' ,
            value: 'nationality'
            },{
            label: 'Company name' ,
            value: 'company_name'
            },{
            label: 'Account type' ,
            value: 'category'
            },{
            label: 'Contact number' ,
            value: 'contact_number'
            },{
            label: 'Home address' ,
            value: 'home_address'
            },{
            label: 'Emergency contact' ,
            value: 'emergency_contact'
            });

            const { Parser } = require('json2csv');

            const json2csvParser = new Parser({fields , quote: '', delimiter: '\t'});
            const csv = json2csvParser.parse(staff_data);
    
            var FileSaver = require('file-saver');
            FileSaver.saveAs(
            new Blob([csv], {
                type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }),
            file_name
            );

            if (is_saved)
            {
                this.$q.notify(
                {
                    color: 'green',
                    message: 'File was successfully saved'
                });
            }
        },

        checkAccount(evt, account_info)
        {
            account_info.type = 'Staff'
            this.$router.push({
                name: "member_personal-information",
                params: {
                    account_info: account_info
                }
            })
        },

        async getTempLogs(person_id)
        {
            let temp_log = await this.$_post(postGetLogs,{ id: person_id, limit: 1})
            return temp_log.data[0]
        },

        async getStaffList()
        {
            let sort_item = {}
            this.start_date = new Date(this.start_date) //.setHours(0,0,0,0)
            this.end_date = new Date(this.end_date).setHours(23,59,59)
            let parameter = {}
            if (this.company_details) 
            {
               if (this.select__account_type == "All") parameter = {company_id: this.company_details._id, date_created: {'$gte': new Date(this.start_date), '$lte': new Date(this.end_date)}}
               else  parameter = {company_id: this.company_details._id, category: this.select__account_type, date_created: {'$gte': new Date(this.start_date), '$lte': new Date(this.end_date)}}
            }
            else
            {
                if (this.select__account_type == "All") parameter = {date_created: {'$gte': new Date(this.start_date), '$lte': new Date(this.end_date)}}
               else  parameter = {category: this.select__account_type, date_created: {'$gte': new Date(this.start_date), '$lte': new Date(this.end_date)}}
            }
            if (this.checkbox_date_saved) sort_item['date_created'] = Number(this.sort_type)
            if (this.checkbox_name) sort_item['given_name'] = Number(this.sort_type)
            if (this.checkbox_temperature) sort_item['temperature'] = Number(this.sort_type)

            this.start_date = new Date(this.start_date).toISOString().split('T')[0]
            this.end_date = new Date(this.end_date).toISOString().split('T')[0]
            this.staff_list = await this.$_post(postGetPersons, {find_person: parameter, sort: sort_item});

        },
        async searchKeyPress(){
            if (this.search != "") {
                 this.staff_list = await this.$_post(postGetPersons);  
            }
            else{
                await this.getStaffList()
            }
        }
    },
    async mounted()
    {
        this.company_details = this.$user_info.company ? this.$user_info.company : {}
        this.select__account_type = this.$route.params.category ? this.$route.params.category : 'All'
        let start = new Date(this.start_date)
        let end = new Date(this.end_date)
        end = end.setDate(end.getDate() + 1)
        await this.getStaffList({find_person: {category: 'Staff', date_created: { '$gt' : start , '$lt' : end}}})
    }

}
</script>
