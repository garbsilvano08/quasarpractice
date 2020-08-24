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
                <div class="content__filter-item">
                    <div class="content__filter-label">Tagged to</div>
                    <q-select v-model="select__tagged_to" :options="options_tagged_to" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Body Temperature</div>
                    <q-select v-model="select__body_temperature" :options="options_body_temperature" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <q-btn @click="getLogList()" class="btn-primary btn-generate" flat dense no-caps>
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

                <div class="content__filter-people content__filter-item">
                    <q-input outlined dense v-model="input__people" class="search-people" placeholder="Search People...">
                        <template v-slot:append>
                            <q-icon name="mdi-magnify" />
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="content__view">
                <div class="content__view-item">
                    <div class="content__view-label">All</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-violet"></div>
                    <div class="content__view-label">Staff (1)</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-orange"></div>
                    <div class="content__view-label">Visitor (1)</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-red"></div>
                    <div class="content__view-label">Stranger (1)</div>
                </div>
            </div>

            <div class="daily-logs__content-body content__grid-4x4">
                <div id='dailyLogs' v-for="(logs, index) in this.log_list" :key="index">
                    <DailyLogCards :all_logs="logs"></DailyLogCards>
                </div>
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

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        sort_type: '1',
        input__people: '',
        start_time: '01:00',
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
        checkbox_date_saved: '',
        checkbox_name: '',
        checkbox_temperature: '',
        company_details: {},
        device_list: [],
        log_list: [],
        selected_device: {}

    }),

    watch:
    {
    //     async select__device_name(val)
    //     {
    //         this.selected_device = this.deviceId(val)
    //         await this.getLogList()
    //     },
    //     start_time(val)
    //     {
    //         console.log(val);
    //     }
    },
    methods:
    {
        exportData()
        {
            // var htmltable= document.getElementById('dailyLogs');
            // var html = htmltable.outerHTML;
            // window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        },
        getCompanyData(value)
        {
            this.company_details = value
        },
        async getLogList()
        {
            let params = {}
            let sort_time_start = this.start_time.split(":")
            let sort_time_end = this.end_time.split(":")

            let date_start = new Date(this.start_date)
            date_start.setHours(sort_time_start[0])
            date_start.setMinutes(sort_time_start[1])

            let date_end = new Date(this.end_date)
            date_end.setHours(sort_time_end[0])
            date_end.setMinutes(sort_time_end[1])
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
            if (this.checkbox_date_saved) sort['date_saved'] = Number(this.sort_type)
            if (this.checkbox_name) sort['full_name'] = Number(this.sort_type)
            if (this.checkbox_temperature) sort['temperature'] = Number(this.sort_type)

            let logs = await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort} );

            for (let index = 0; index < logs.data.length; index++) {                
                logs.data.forEach(async log => {
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
                            logs.data[index].person_img = res
                            await this.$_post('member/save/image', {info: {id: log._id, image: res}});
                        }
                        catch(e){}
                    }
                    logs.data[index].date = this.convertDateFormat(logs.data[index].date_saved)
                    logs.data[index].device = this.deviceId("", logs.data[index].device_id)
                    index++
                    // console.log(element);
                });

            }

            this.log_list = logs.data
        },

        convertDateFormat(date_saved)
        {
            let full_date = new Date(date_saved)
            let date = full_date.toISOString().split('T')[0]
            // let time = full_date.getHours() < 
            var hours = full_date.getHours() ; // gives the value in 24 hours format
            var AmOrPm = hours >= 12 ? 'PM' : 'AM';
            hours = (hours % 12) || 12;
            var minutes = full_date.getMinutes() ;
            var finalTime = hours + ":" + minutes + " " + AmOrPm; 

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
        this.company_details = this.$user_info.company ? this.$user_info.company : {}

        await this.getDevice()
        await this.getLogList()
    
    }
}
</script>
 