<template>
    <div class="report">
        <div class="report__header" style="margin-bottom: 15px !important;">
            <div class="header__title">FEVER DETECTED REPORTS</div>
            <div class="header__filter">
                <com-picker :user="this.$user_info" class="btn-choose" @select=getCompanyDatas></com-picker>
                <q-btn @click="exportTableToExcel('tblData', 'fever-detected')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__header">
            <div class="header__filter">
                <q-input v-model="start__date" type="date" outlined dense></q-input>
                <q-input v-model="end__date" type="date" outlined dense></q-input>
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
        <div class="report__container content__box">
            <div class="content__table">
                <!-- <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Home Address</th>
                            <th>Last Scanned</th>
                            <th>Body Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person, i) in this.personWithFever" :key="i">
                            <td class="td-active">{{person.full_name}}</td>
                            <td>{{person.gender}}</td>
                            <td>{{person.age}}</td>
                            <td>{{ person.home_address }}</td>
                            <td>{{person.date_logged}}</td>
                            <td class="td-red">{{person.temperature}}°C</td>
                        </tr>
                    </tbody>
                </table> -->
                <q-table id="tblData" dense  flat :data="personWithFever" :pagination.sync="pagination" :columns="table_column"></q-table>
            </div>
        </div>
    </div>
</template>

<script>
import './Report.scss';
import { postGetPersonLogs , postGetPerson, postPersonByCateg, postExpFeverDeteted}                        from '../../../references/url';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import { log } from 'util';

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
        start__date: new Date(),
        end__date: new Date(),
        select__company: '',
        pagination: {
            rowsPerPage: 10,
        },
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        personWithFever : [{}],
        company_details : "",
        table_column:
        [
            {
                name    : 'full_name',
                label   : 'Name',
                field   : 'full_name',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'category',
                label   : 'Account type',
                field   : 'category',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'home_address',
                label   : 'Home Address',
                field   : 'home_address',
                align   : 'let',
                required: true,
                sortable: true,
            },
            {
                name    : 'company_name',
                label   : 'Tagged to',
                field   : 'company_name',
                align   : 'left',
                required: true,

                sortable: true,
            },
            {
                name    : 'date_logged',
                label   : 'Date Scanned',
                field   : 'date_logged',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'device_id',
                label   : 'Device Scanned',
                field   : 'device_id',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'temperature',
                label   : 'Temperature',
                field   : 'temperature',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],

        sample_data:
        [
            {
                full_name: 'Jayjay Helterbrand',
                account_type: 'Male',
                home_address: 25,
                tagged_to: 'Balagtas Bulacan',
                date_scanned: new Date().toISOString().split('T')[0],
                device_scanned: '',
                temperature: '26'
            },
            {
                full_name: 'Juan',
                account_type: 'Male',
                home_address: 23,
                tagged_to: 'Pandi Bulacan',
                date_scanned: new Date().toISOString().split('T')[0],
                device_scanned: '',
                temperature: '27'
            },
            {
                full_name: 'Juan',
                account_type: 'Male',
                home_address: 23,
                tagged_to: 'Pandi Bulacan',
                date_scanned: new Date().toISOString().split('T')[0],
                device_scanned: '',
                temperature: '27'
            },
            {
                full_name: 'Juan',
                account_type: 'Male',
                home_address: 23,
                tagged_to: 'Pandi Bulacan',
                date_scanned: new Date().toISOString().split('T')[0],
                device_scanned: '',
                temperature: '27'
            },
            {
                full_name: 'Juan',
                account_type: 'Male',
                home_address: 23,
                tagged_to: 'Pandi Bulacan',
                date_scanned: new Date().toISOString().split('T')[0],
                device_scanned: '',
                temperature: '27'
            }

        ],
        sort_item: 'Date Created',
        sort_options: ['Date Logged', 'Full Name', 'Temperature'],
        sort: '1'
    }),
    async mounted()
    {
        let logs = await this.$_post(postPersonByCateg, {find_by_category : {date_logged : (new Date().getFullYear())+ '-' +(new Date().getMonth()+1).toString().padStart(2, "0")+'-'+new Date().getDate().toString().padStart(2, "0")}});
        this.getPersonWithFever(logs);
    },
     watch:
    {
        async select__date(val)
        {
            if (val)
            {
                let params = this.sortOption()
                if (this.company_details)
                this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params));
                else
                this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params));
            }
        }
    },
    methods:
    {
        sortOption()
        {
            let params = {}
            if (this.sort_item == 'Date Saved') params = {date_logged: Number(this.sort)}
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
            this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params));
            else
            this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params));

            // await this.getPersonWithFever({find_by_category: {has_fever: true, date_saved: {$gt: start, $lt: end}}, sort: params})
        },

        async exportTableToExcel(tableID, filename = ''){
            let sort_options = this.sortOption()
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let file_name = 'feverdetectedreport_' + date + '.xls'
            let is_saved = await this.$_post(postExpFeverDeteted,{user_name: this.$user_info.full_name, work_sheet: 'Fever Detected Report', file_name: file_name,sort: sort_options, find_data: {has_fever: true}});
            if (is_saved)
            {
                this.$q.notify(
                {
                    color: 'green',
                    message: 'File was successfully saved'
                });
            }
            let fields = [] , person_with_fever_data = [{}]
            for (let index = 0; index < this.personWithFever.length; index++) {
                person_with_fever_data.push({
                    "full_name": this.personWithFever[index].full_name,
                    "category": this.personWithFever[index].category,
                    "home_address": this.personWithFever[index].home_address,
                    "company_name": this.personWithFever[index].company_name,
                    "date_logged" : this.personWithFever[index].date_logged,
                    "device_id" : this.personWithFever[index].device_id,
                    "temperature" : this.personWithFever[index].temperature,
                },)
            }
            fields.push({
            label: 'Full name',
            value: 'full_name'
            },{
            label: 'Account type',
            value: 'category'
            },{
            label: 'Home Address',
            value: 'home_address'
            },{
            label: 'Company name' ,
            value: 'company_name'
            },{
            label: 'Date scanned' ,
            value: 'date_logged'
            },{
            label: 'Device scanned' ,
            value: 'device_id'
            },{
            label: 'Temperature' ,
            value: 'temperature'
            });

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

        async getCompanyDatas(value)
        {
            this.company_details = value
            // this.getTotalScannedToday(new Date(), value._id)
            // this.getPersonWithFever(await this.getStaffList({ date_logged: this.select__date, company_id: value._id}));
            let params = this.sortOption()
            if (this.company_details)
            this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0], company_id: this.company_details._id}, params));
            else
            this.getPersonWithFever(await this.getStaffList({date_logged: new Date(this.select__date).toISOString().split('T')[0]}, params));
        },
        async getPersonWithFever(logs)
        {
            this.personWithFever = [];
            // let logs = await this.$_post(postGetPersonLogs, );
            logs = logs.data;
            console.log(logs)
            logs.forEach(async person => {
            if(person.has_fever)
            {   
                if (person.category == "Stranger")
                {
                    person.gender = "Unknown";
                    person.home_address = "Unknown";
                    //person.age = "Unknown";
                    this.personWithFever.push(person);
                }
                else
                {
                let det = await this.$_post(postGetPerson, {id: person.person_id});
                person.gender = det.data.personal_info.gender;
                person.home_address = det.data.personal_info.home_address;
                person.age = calculate_age(new Date(det.data.personal_info.birthday))
                this.personWithFever.push(person);
                }
            }
        });
        },

        async getStaffList(params, sort)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort});
        }
    },

}
</script>
