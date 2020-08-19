<template>
    <div class="account-directory">
        <div class="account-directory__header" style="margin-bottom: 15px !important;">
            <div class="header__title">ALL STAFF</div>
            <div class="header__filter">
                <q-input outlined dense v-model="search" placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <com-picker :user="this.$user_info" class="btn-choose" @select=getCompanyData></com-picker>
            </div>
        </div>
        <div class="account-directory__header">
            <div class="header__filter">
                <q-input label="Start Date" class="select-sm" v-model="start_date" type="date" outlined dense></q-input>
                <q-input label="End Date" class="select-sm" v-model="end_date" type="date" outlined dense></q-input>
                <q-btn flat dense no-caps class="btn-outline btn-sort" label="Sort">
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
                <q-btn @click="exportTableToExcel('tblData', 'staff-list')" class="btn-primary btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
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
                name    : 'company_name',
                label   : 'Company Name',
                field   : row => row.company_name ? row.company_name : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'position',
                label   : 'Position',
                field   : row => row.position ? row.position : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],
        sort_item: 'Date Created',
        sort_options: ['Date Created', 'Last Name', 'First Name', 'Middle Name'],
        sort: '1'
    }),
    watch:
    {
        async start_date(val)
        {
            let params = this.sortOption()
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            await this.getStaffList({find_person: {category: 'Staff', date_created: {$gt: start, $lt: end}}, sort: params})
        },
        async end_date(val)
        {
            let params = this.sortOption()
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            await this.getStaffList({find_person: {category: 'Staff', date_created: {$gt: start, $lt: end}}, sort: params})
        }
    },

    methods:
    {
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
            this.sort_item = option
            let params = this.sortOption()

            // let params = this.sortOption()
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            await this.getStaffList({find_person: {category: 'Staff', date_created: {$gt: start, $lt: end}}, sort: params})
        },

        async exportTableToExcel(tableID, filename = ''){
            let sort_options = this.sortOption()
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            // start = start.setDate(start.getDate() - 1)

            let file_name = 'staff_' + date + '.xlsx'
            // if (this.company_details) params = {user_name: this.$user_info.full_name, work_sheet: 'Staff', file_name: file_name, find_data: {company_name: this.company_details.company_name, has_fever: true, date_saved: { '$gt' : new Date(start) , '$lt' : new Date(end)}}}
            params = {user_name: this.$user_info.full_name, work_sheet: 'Staff',file_name: file_name,sort: sort_options, find_data: {category: 'Staff', date_created: { '$gt' : start , '$lt' : end}}}
            let is_saved = await this.$_post(postExpPerson,params);

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

        async getStaffList(params = {}, sort)
        {
            this.staff_list = await this.$_post(postGetPersons, params);

        }
    },
    async mounted()
    {
        let start = new Date(this.start_date)
        let end = new Date(this.end_date)
        end = end.setDate(end.getDate() + 1)
        await this.getStaffList({find_person: {category: 'Staff', date_created: { '$gt' : start , '$lt' : end}}})
    }

}
</script>
