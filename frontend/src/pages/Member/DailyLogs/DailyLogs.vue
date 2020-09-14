<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_company" outlined dense></q-select> -->
                <com-picker :user="this.$user_info" @select=getCompanyData class="btn-choose"></com-picker>
                <q-btn @click="exportData" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>

            </div>
        </div>

        <div class="daily-logs__content">
            <div class="content__filter-1">
                <div class="content__filter-item">
                    <div class="content__filter-label">Account Type</div>
                    <q-select v-model="select__account_type" :options="options_account_type" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Date from</div>
                    <q-input type='date' v-model="start_date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Date to</div>
                    <q-input type='date' v-model="end_date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Time from</div>
                    <q-input type='time' v-model="start_time" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Time to</div>
                    <q-input type='time' v-model="end_time" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Device Name</div>
                    <q-select v-model="select__device_name" :options="options_device_name" outlined dense></q-select>
                </div>
                <!-- <div class="content__filter-item">
                    <div class="content__filter-label">Tagged to</div>
                    <q-select v-model="select__tagged_to" :options="options_tagged_to" outlined dense></q-select>
                </div> -->
                <div class="content__filter-item">
                    <div class="content__filter-label">Body Temperature</div>
                    <q-select v-model="select__body_temperature" :options="options_body_temperature" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <q-btn @click="getLogList(start_date, end_date, start_time, end_time, '', 'generate')" class="btn-primary btn-generate" flat dense no-caps>
                        Generate
                    </q-btn>
                </div>
            </div>
            <div class="content__filter-2">
                <div class="content__filter-item">
                    <q-btn-dropdown class="btn-dropdown__primary" label="Sort By" flat dense no-caps>
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="sort_type" val='-1' dense label="Descending" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="sort_type" val='1' dense label="Ascending" />
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="item_sort" val='date' dense label="Date Saved" />
                                </q-item-section>
                            </q-item>
                             <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="item_sort" val='name' dense label="Name" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="item_sort" val='temp' dense label="Temperature" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
                <div class="content__filter-item">
                    <q-btn-dropdown class="btn-dropdown__primary" label="View As" flat dense no-caps>
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="view_as" val='grid' dense label="Grid" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio v-model="view_as" val='list' dense label="List" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>

                <div class="content__filter-people content__filter-item">
                    <q-input outlined dense v-model="input__people" @keypress.exact.native="filteredList()" class="search-people" placeholder="Search People...">
                        <template v-slot:append>
                            <q-icon name="mdi-magnify" />
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="content__view">
                <div class="content__view-item">
                    <div v-if="select__account_type == 'All'" class="content__view-label">All ({{log_items}})</div>
                </div>
                <div v-if="select__account_type == 'Staff'" class="content__view-item">
                    <div class="content__view-color color-violet"></div>
                    <div class="content__view-label">Staff ({{log_items}})</div>
                </div>
                <div v-if="select__account_type == 'Visitor'" class="content__view-item">
                    <div class="content__view-color color-orange"></div>
                    <div class="content__view-label">Visitor ({{log_items}}) </div>
                </div>
                <div v-if="select__account_type == 'Stranger'" class="content__view-item">
                    <div class="content__view-color color-red"></div>
                    <div class="content__view-label">Stranger ({{log_items}}) </div>
                </div>
            </div>

            <div v-if="view_as=='grid'" class="daily-logs__content-body content__grid-4x4">
                <div id='dailyLogs' v-for="(logs, index) in filteredList" :key="index">
                    <DailyLogCards :all_logs="logs"></DailyLogCards>
                </div>
            </div>
            <q-table v-else dense flat :data="this.filteredList" :hide-pagination="true" :rows-per-page-options="[20]" :columns="table_column"></q-table>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="current_page"
                    :max="page_number"
                    :max-pages="2"
                    :boundary-numbers="false"
                    :direction-links="true"
                    >
                </q-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"
import { postGetCompanies, postFindLogs, postPersonByCateg, postGetDevice } from '../../../references/url';
import { log } from 'util';
import { base64StringToBlob } from 'blob-util';
import { sort } from '../../../references/nav';
import { saveAs } from 'file-saver';
import LoginVue from '../../Front/Login.vue';
export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        selected_option_account_type: 1,
        flag: 1,
        current_page: 1,
        page_number: 0,
        view_as: 'grid',
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
                name    : 'temperature',
                label   : 'Temperature',
                field   : row => row.temperature ? row.temperature : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'device',
                label   : 'Device Name',
                field   : row => row.device.device_name + "-" + row.device.log_type,
                align   : 'left',
                required: true,
                sortable: true,
            },
            {
                name    : 'company',
                label   : 'Company',
                field   : row => row.company_name,
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
                name    : 'date_logged',
                label   : 'Date Logged',
                field   : row => row.date ? row.date : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],
        log_items: 0,
        item_sort: 'date',
        sort_type: '-1',
        current_page: 1,
        page_number: 1,
        input__people: '',
        start_time: '00:00',
        end_time:  '23:59',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        select__account_type: 'All',
        options_account_type: [
            'All', 'Staff', 'Visitor', 'Stranger'
        ],
        select__device_name: 'All',
        options_device_name: ['All'],
        select__tagged_to: 'All',
        options_tagged_to: [
            'All'
        ],
        select__body_temperature: 'Normal',
        options_body_temperature: [
            'Normal', 'Fever'
        ],
        checkbox_date_saved: true,
        checkbox_name: false,
        checkbox_temperature: false,
        company_details: {},
        device_list: [],
        log_list: [],
        selected_device: {}

    }),
    computed:{
        filteredList() {
            return this.log_list.filter((logs) => {
                return logs.full_name.toLowerCase().includes(this.input__people.toLowerCase());
            });
        }
    },
    watch:
    {
        async item_sort(val)
        {
            await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
        },
        async sort_type(val)
        {
            await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
        },
        async current_page(new_val, old_val)
        {
            if (new_val - 1 == old_val)
            {
                await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
                // let date = new Date(this.filteredList[this.filteredList.length - 1 ].date_saved)
                // // date.setHours(date.getHours() - 8)
                // let end = new Date(date).toISOString().split('T')[0];
                // await this.getLogList(this.start_date, end, this.start_time, date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds())
            }
            else if (new_val + 1 == old_val)
            {
                await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time, 'reverse')
                // let date = new Date(this.filteredList[0].date_saved)
                // // date.setHours(date.getHours() - 8)
                // let start = new Date(date).toISOString().split('T')[0];
                // await this.getLogList(start, this.end_date, date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds(), this.end_time, 'reverse')
            }
            else if (new_val == 1)
            {
                await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
                // let start = new Date(date).toISOString().split('T')[0];
                // await this.getLogList(this.start_date, this.end_date, this.end_date, this.end_time)
            }
        },
        select__device_name(val)
        {
            for (let index = 0; index < this.device_list.length; index++) {
                if ( this.device_list[index].device_name == val ) this.selected_device = this.device_list[index]
            }
        },
        async input__people(val)
        {
            if(val == ""){
                await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
            }
        },
    //     start_time(val)
    //     {
    //         console.log(val);
    //     }
    },
    methods:
    {
        async updateImage()
        {
            if (this.$user_info.company)
            {
                let logs = await this.$_post(postPersonByCateg, {find_by_category: {company_id: this.$user_info.company._id, person_img: { $regex: '/9j/'}}});
                for (let index = 0; index < logs.data.length; index++) {   
                    let imageName = 'vision-' + Date.now().toString() + ".png"
                    let blob = "";
                    var formDatatoBackend = new FormData();
                    let contentType = 'image/png';
                    blob = "";
                    blob = base64StringToBlob(logs.data[index].person_img, contentType);
                    blob.lastModifiedDate = new Date();
                    formDatatoBackend.append('image', blob, imageName);
                    let res
                    try
                    {
                        res = await this.$_post_file(formDatatoBackend);
                        logs.data[index].person_img = res
                        await this.$_post('member/save/image', {info: {id: logs.data[index]._id, image: res}});
                        if (logs.data[index].has_fever ==  true)
                        {
                            this.log_alert =  logs.data[index]
                            this.dialog = true
                        }
                    }
                    catch(e){}
                }
            }
        },
        exportData()
        {
            console.log(this.log_list.length);
            let date = new Date().toISOString().split('T')[0].replace(/[^/0-9]/g, '')
            let params = {}
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            let file_name = this.select__account_type+"_" + date + '.xls'

            let fields = [] , log_list_data = [{}]
            for (let index = 0; index < this.log_list.length; index++) {
                log_list_data.push({
                    "full_name": this.log_list[index].full_name,
                    "gender": this.log_list[index].gender,
                    "temperature": this.log_list[index].temperature,
                    "has_fever": this.log_list[index].has_fever,
                    "company_name": this.log_list[index].company_name,
                    "category": this.log_list[index].category,
                    "home_address" : this.log_list[index].home_address,
                    "date_logged" : this.log_list[index].date,
                },)
            }

            fields.push({
            label: 'Full name',
            value: 'full_name'
            },{
            label: 'Gender',
            value: 'gender'
            },{
            label: 'Temperature',
            value: 'temperature'
            },{
            label: 'Has Fever',
            value: 'has_fever'
            },{
            label: 'Company name',
            value: 'company_name'
            },{
            label: 'Category',
            value: 'category'
            },{
            label: 'Home address',
            value: 'home_address'
            },{
            label: 'Date logged',
            value: 'date_logged'
            });
    
            const { Parser } = require('json2csv');

            const json2csvParser = new Parser({fields , quote: '', delimiter: '\t'});
            const csv = json2csvParser.parse(log_list_data);

            var FileSaver = require('file-saver');
            FileSaver.saveAs(
            new Blob([csv], {
                type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }),
            file_name
            );
        },
        getCompanyData(value)
        {
            this.company_details = value
        },
        async getLogList(sort_date_start, sort_date_end, sort_start, sort_end, sort_reverse = "", generate = "")
        {
            this.$q.loading.show();
            if (this.select__account_type == 'All') this.selected_option_account_type = 1
            else if (this.select__account_type == 'Staff') this.selected_option_account_type = 2
            else if (this.select__account_type == 'Visitor') this.selected_option_account_type = 3
            else if (this.select__account_type == 'Stranger') this.selected_option_account_type = 4
            if (generate) {
                this.current_page = 1;
                this.page_number = 1
            }
            let skip = 0
            let params = {}
            let sort_time_start = sort_start.split(":")
            let sort_time_end = sort_end.split(":")

            let date_start = new Date(sort_date_start)
            date_start.setHours(sort_time_start[0])
            date_start.setMinutes(sort_time_start[1])
            date_start.setSeconds(sort_time_start[2] ? sort_time_start[2] : '00')
            date_start.setMilliseconds(sort_time_start[3] ? sort_time_start[3] : '00')

            // date_start.setHours(date_start.getHours
            date_start.setMinutes(sort_time_start[1])

            let date_end = new Date(sort_date_end)
            date_end.setHours(sort_time_end[0])
            date_end.setMinutes(sort_time_end[1])
            date_end.setSeconds(sort_time_end[2] ? sort_time_end[2] : '00')
            // date_end.setMilliseconds(sort_time_end[3] ? sort_time_end[3] : '00')

            // date_end.setHours(date_end.getHours() + 8)
            date_end.setMinutes(sort_time_end[1])
            
            // if (sort_reverse)
            // {
            //     date_start.setMilliseconds(date_start.getMilliseconds() + 1)
            //     date_end.setMilliseconds(date_end.getMilliseconds() + 1)
            // }
            if (this.select__account_type == 'All')
            {
                if (this.company_details)
                {
                    if (this.select__device_name == 'All')
                    {
                        params = {
                            company_id: this.company_details._id ,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                    else
                    {
                        params = {
                            company_id: this.company_details._id ,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            device_id: this.selected_device.device_id,
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                }
                else
                {
                    if (this.select__device_name == 'All')
                    {
                        params = {
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                    else
                    {
                        params = {
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            device_id: this.selected_device.device_id,
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                }
            }
            else
            {
                if (this.company_details)
                {
                    if (this.select__device_name == 'All')
                    {
                        params = {
                            category: this.select__account_type,
                            company_id: this.company_details._id ,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                    else
                    {
                        params = {
                            category: this.select__account_type,
                            company_id: this.company_details._id ,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            device_id: this.selected_device.device_id,
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                }
                else
                {
                    if (this.select__device_name == 'All')
                    {
                        params = {
                            category: this.select__account_type,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                    else
                    {
                        params = {
                            category: this.select__account_type,
                            date_saved: { '$gte' : date_start , '$lte' : date_end},
                            device_id: this.selected_device.device_id,
                            has_fever: this.select__body_temperature == 'Normal' ? false : true
                        }
                    }
                }
            }
            let sort = {}
            if (this.item_sort == 'date') sort['date_saved'] =  Number(this.sort_type)
            if (this.item_sort == 'name') sort['full_name'] =  Number(this.sort_type)
            if (this.item_sort == 'temp') sort['temperature'] = Number(this.sort_type)
            if (this.current_page > 1) skip = 20 * (this.current_page - 1)

            let logs = await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort, skip: skip} );
            // if (sort_reverse) logs.data.reverse()
            for (let index = 0; index < logs.data.length; index++) {
                logs.data.forEach(async log => {
                    logs.data[index].date = this.convertDateFormat(logs.data[index].date_saved)
                    logs.data[index].device = this.deviceId("", logs.data[index].device_id)
                    index++
                });
            }
            this.log_list = logs.data
            if (this.current_page == 1)
            {
                let count = await this.$_post('member/get/count_logs', {find_by_category: params, sort: sort} );
                // console.log(count);
                this.log_items = count.data.count
                this.page_number = Math.ceil(count.data.count / 20)
            }

            this.$q.loading.hide();
        },

        convertDateFormat(date_saved)
        {
            let full_date = new Date(date_saved)
            let date = full_date.toISOString().split('T')[0]
            var hours = full_date.getHours() ; // gives the value in 24 hours format
            var AmOrPm = hours >= 12 ? 'PM' : 'AM';
            hours = (hours % 12) || 12;
            var minutes = full_date.getMinutes() ;
            var finalTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
            // console.log(date + ", " + finalTime);
            return date + ", " + finalTime
        },

        deviceId(device_name, device_id)
        {
            for (let index = 0; index < this.device_list.length; index++) {
                if (device_name && this.device_list[index].device_name == device_name) return this.device_list[index]
                else  if (device_id && this.device_list[index].device_id == device_id) return this.device_list[index]
            }
        },

        async getDevice()
        {
            let params = {}
            if (this.company_details || this.company_details.company_name != "All Company" ){
                params = {find_device: {company_name: this.company_details.company_name}}
            }
            else params = {find_device: {date_installed: { '$gt' : new Date(this.date_range) , '$lt' : new Date()}}}

            let {data: devices} =  await this.$_post(postGetDevice, params);
            devices.forEach(device => {
                this.options_device_name.push(device.device_name)
                this.device_list.push(device)
            });
        }
    },
    async mounted()
    {
        if (this.$route.params && this.$route.params.category)
        {
            if (this.$route.params.category == 'Fever')
            {
                this.select__body_temperature = 'Fever'
            }
            else
            {
                this.select__account_type = this.$route.params.category
            }
        }

        this.company_details = this.$user_info.company ? this.$user_info.company : {}

        await this.getDevice()
        await this.getLogList(this.start_date, this.end_date, this.start_time, this.end_time)
        // await this.updateImage()
    }
}
</script>
