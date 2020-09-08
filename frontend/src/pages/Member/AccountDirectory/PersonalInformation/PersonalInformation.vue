<template>
    <div class="personal-info">
        <div class="personal-info__header">
            <q-btn @click="back" class="btn-back btn-outline" flat dense no-caps label="Back"></q-btn>
            <div class="personal-info__header-btn" v-if="this.$route.params.from_account_directory">
                <q-btn @click="removeAccount()" class="btn-outline btn-remove" flat dense no-caps label="Remove"></q-btn>
                <q-btn @click="editAccount()" class="btn-primary btn-edit" flat dense no-caps label="Edit"></q-btn>
            </div>
            <div class="personal-info__header-btn" v-if="this.$route.params.from_daily_logs">
                <q-btn @click="exportTableToExcel()" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__header-2" v-if="this.$route.params.from_daily_logs">
            <div class="header__filter-2">
                <q-input label="Start Date" class="select-sm" v-model="start_date" type="date" outlined dense @change="selectedSortDate"></q-input>
                <q-input label="End Date" class="select-sm" v-model="end_date" type="date" outlined dense @change="selectedSortDate"></q-input>
                <!-- <q-btn label="Generate" @click="generateResult" class="btn-primary btn-generate" flat dense no-caps/> -->
            </div>
        </div>
        <div class="personal-info__container content__box" v-if="this.$route.params.from_account_directory">
            <div class="personal-info__holder">
                <div class="personal-info__content-header">
                    <q-icon name="mdi-apple-icloud" size="30px"></q-icon>
                    <div class="content__title">Healthcloud Information</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="account_info.data.personal_info.person_img">
                            <q-btn flat dense rounded icon="mdi-magnify" size="13px"></q-btn>
                        </q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">First Name:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.given_name}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Last Name:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.last_name}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Middle Name:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.middle_name}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Gender:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.gender}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Birth Date:</div>
                                    <div class="personal-info__item-info">{{birthday}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Age:</div>
                                    <div class="personal-info__item-info">{{new Date().getFullYear() - new Date(account_info.data.personal_info.birthday).getFullYear()}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Nationality:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.nationality}}</div>
                                </div>
                            </div>
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Home Address:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.home_address}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Contact Number:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.contact_number}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Emergency Contact Number:</div>
                                    <div class="personal-info__item-info">{{account_info.data.personal_info.emergency_contact}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder" v-if="this.$route.params.from_account_directory">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-briefcase" size="20px"></q-icon>
                    <div class="content__title">Data Source</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="company_info.data.company_logo_url"></q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Company Name:</div>
                                    <div class="personal-info__item-info">{{company_info.data.company_name}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Parent:</div>
                                    <div class="personal-info__item-info">{{company_info.data.parent_company}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Date Registered:</div>
                                    <div class="personal-info__item-info">{{date_registered}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Total Registered:</div>
                                    <div class="personal-info__item-info">{{company_info.data.staff}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Devices:</div>
                                    <div class="personal-info__item-info"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder" v-if="this.$route.params.from_account_directory && account_info.data.personal_info.category == 'Visitor'">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-card-account-details" size="20px"></q-icon>
                    <div class="content__title">Registered Identification Card</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="this.identification_info.data[0].id_image"></q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">ID Type:</div>
                                    <div class="personal-info__item-info">{{this.identification_info.data[0].id_type}}</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">ID Number:</div>
                                    <div class="personal-info__item-info">{{this.identification_info.data[0].id_number}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="account_info.data" class="personal-info__container content__box">
            <div class="personal-info__holder">
                <div class="personal-info__content-header">
                    <q-icon name="mdi-apple-icloud" size="30px"></q-icon>
                    <div class="content__title">Healthcloud Information</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="account_info.data.personal_info.person_img">
                            <q-btn flat dense rounded icon="mdi-magnify" size="13px"></q-btn>
                        </q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">First Name:</div>
                                <div class="personal-info__item-info">{{account_info.data.personal_info.given_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Last Name:</div>
                                <div class="personal-info__item-info">{{account_info.data.personal_info.last_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Middle Name:</div>
                                <div class="personal-info__item-info">{{account_info.data.personal_info.middle_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Gender:</div>
                                <div class="personal-info__item-info">{{account_info.data.personal_info.gender}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Birth Date:</div>
                                <div class="personal-info__item-info">{{ new Date(account_info.data.personal_info.birthday).getFullYear() +
                                    "/" + new Date(account_info.data.personal_info.birthday).getDay() +
                                    "/" +new Date(account_info.data.personal_info.birthday).getMonth()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Age:</div>
                                <div class="personal-info__item-info">{{ new Date().getFullYear() - new Date(account_info.data.personal_info.birthday).getFullYear()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Nationality:</div>
                                <div class="personal-info__item-info">{{ account_info.data.personal_info.nationality }}</div>
                            </div>
                        </div>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Home Address:</div>
                                <div class="personal-info__item-info">{{ account_info.data.personal_info.home_address}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Contact Number:</div>
                                <div class="personal-info__item-info">{{ account_info.data.personal_info.contact_number }}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Emergency Contact Number:</div>
                                <div class="personal-info__item-info">{{ account_info.data.personal_info.emergency_contact }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="company_info.data" class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-briefcase" size="20px"></q-icon>
                    <div class="content__title">Data Source</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="company_info.data.company_logo_url"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Company Name:</div>
                                <div class="personal-info__item-info">{{company_info.data.company_name }}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Parent:</div>
                                <div class="personal-info__item-info">{{ company_info.data.parent_company }}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label"> {{account_info.date_created ? 'Date Registered:' : 'Date Blaclisted'}}</div>
                                <div class="personal-info__item-info">{{
                                    new Date(account_info.data.personal_info.date_created).getFullYear() + "/" + new Date(account_info.data.personal_info.date_created).getDay() + "/" +new Date(account_info.data.personal_info.date_created).getMonth()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Total Registered:</div>
                                <div class="personal-info__item-info">32</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Devices:</div>
                                <div class="personal-info__item-info">{{company_device}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="account_info.type == 'Visitor'" class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-card-account-details" size="20px"></q-icon>
                    <div class="content__title">Registered Identification Card</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="account_info.data.identification[0].id_image ? account_info.data.identification[0].id_image : ''"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Type:</div>
                                <div class="personal-info__item-info">{{account_info.data.identification[0].id_type ? account_info.data.identification[0].id_type : 'N/A'}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Number:</div>
                                <div v-if="account_info.data.identification[0].type == 'Staff'" class="personal-info__item-info">{{account_info.data.identification[0].id_num ? account_info.data.identification[0].id_num : 'N/A'}}</div>
                                <div v-else class="personal-info__item-info">{{account_info.data.identification[0].id_number ? account_info.data.identification[0].id_number : 'N/A'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="personal-info__container content__box" style="margin-top: 30px" v-if="this.$route.params.from_daily_logs">
            <div class="personal-info__content-header">
                <q-icon name="mdi-face-recognition" size="22px"></q-icon>
                <div class="content__title">User Logs</div>
            </div>
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Body Temperature</th>
                            <th>Device Name</th>
                            <th>Company/Location Scanned</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.person_logs">
                        <tr v-for="(logs, index) in this.person_logs.data" :key="index">
                            <td>{{logs.date_saved}}</td>
                            <td class="td-green">{{logs.temperature}}°C</td>
                            <td>{{logs.device_id}}</td>
                            <td>{{logs.company_name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import "./PersonalInformation.scss";
import { postRemoveAccount , postGetCompany, postGetDevice, postGetPerson, postGetLogs, postGetIdentification} from '../../../../references/url';
import { date } from 'quasar';
import { log } from 'util';

export default {
     data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0], 
        account_info: {},
        company_device: 0,
        company_info: {},
        person_logs: {},
        person_date_logs: {},
        identification_info : {},
        age : '',
        birthday : '',
        date_registered : '',
        sort_type: '-1'
    }),

    methods:
    {   
        async exportTableToExcel(){
            let file_name = this.$route.params.daily_logs_info.full_name+ '_logs.xls'
            let fields = [] , person__logs = [{}]          
            for (let index = 0; index < this.person_logs.data.length; index++) {
                person__logs.push({
                    "date_saved": this.person_logs.data[index].date_saved,
                    "temperature": this.person_logs.data[index].temperature,
                    "device_id": this.person_logs.data[index].device_id,
                    "company_name": this.person_logs.data[index].company_name,
                },
                )
            }
            fields.push({
            label: 'Date & Time Scanned',
            value: 'date_saved'
            },{
            label: 'Body Temperature',
            value: 'temperature'
            },{
            label: 'Device name',
            value: 'device_id'
            },{
            label: 'Company name' ,
            value: 'company_name'
            });
            const { Parser } = require('json2csv');

            const json2csvParser = new Parser({fields , quote: '', delimiter: '\t'});
            const csv = json2csvParser.parse(person__logs);

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
        async selectedSortDate(){
            await this.getLogs()
        },
        async getLogs(){
            let sort_item = {}
            this.start_date = new Date(this.start_date).setHours(0,0,0,0)
            this.end_date = new Date(this.end_date).setHours(23,59,59)
            let parameter = {}
            
            parameter = {id : this.$route.params.daily_logs_info.frontdesk_person_id, date_created: {'$gte': new Date(this.start_date), '$lte': new Date(this.end_date)}}
            sort_item['date_saved'] = Number(this.sort_type)
            this.start_date = new Date(this.start_date).toISOString().split('T')[0]
            this.end_date = new Date(this.end_date).toISOString().split('T')[0]
            this.person_logs = await this.$_post(postGetLogs, {find_logs: parameter, sort: sort_item ,limit:10});
            
            for (let index = 0; index < this.person_logs.data.length; index++) {
                this.person_logs.data[index].date_saved = date.formatDate(this.person_logs.data[index].date_saved, 'MMM D YYYY - hh:mm:ss A')
            }
        },
        back()
        {
            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory"})
            else if (this.account_info.type == 'Blacklist') this.$router.push({name: "member_accountdirectory_blacklist"})
            else if (this.account_info.type == 'Visitor') this.$router.push({name: "member_accountdirectory_visitor"})
            //else this.$router.push({name: "member_dailylogs"})
        },
        getImgUrl(path){

            return "http://localhost:4001/images/"+path;
        },
        async removeAccount()
        {
            await this.$_post(postRemoveAccount, {id: this.$route.params.account_info._id , type: this.account_info.type});
            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory"})
            else this.$router.push({name: "member_accountdirectory_blacklist"})

             Notify.create({
                color: 'green',
                message: 'Successfully removed from ' + this.account_info.type
            });
        },
        async getDeviceNumber(comapny)
        {
            let device_list = await this.$_post(postGetDevice, {find_device: {company_name: comapny}});
            this.company_device = device_list.data.length
        },
        editAccount()
        {
            let name = ''

            if (this.account_info.type == 'Staff') name = 'member_frontdesk_staff'
            else if (this.account_info.type == 'Blacklist') name = 'member_frontdesk_blacklist'
            else if (this.account_info.type == 'Visitor') name = 'member_frontdesk_visitor'

            this.$router.push({
                name: name,
                params: {
                    account_info: this.account_info.data.personal_info,
                    is_edit: 'edit'
                }
            })
        
        },
        async getCompany(company_id)
        {
            return await this.$_post(postGetCompany, {id: company_id})
        },
        async getParentCompany(company_id)
        {
            if (company_id != 'No Parent')
            {
                let company = await this.getCompany(company_id)
                return company.data.company_name
            }
            return company_id
        }
    },

    async mounted()
    {   
        if (this.$route.params.account_info) {
            this.account_info = await this.$_post(postGetPerson, {id: this.$route.params.account_info._id});
            this.account_info.type = this.$route.params.account_info.type;
            await this.getDeviceNumber(this.account_info.data.personal_info.company_name ? this.account_info.data.personal_info.company_name : '');
            if (this.account_info.data.personal_info.company_id)
            {
                this.company_info = await this.getCompany(this.account_info.data.personal_info.company_id)
                this.company_info.data.parent_company =  await this.getParentCompany(this.company_info.data.parent_id)
            }

            // if (this.account_info.data.personal_info.frontdesk_person_id)
            // {
            //     this.person_logs = await this.$_post(postGetLogs,{ id: this.account_info.data.personal_info.frontdesk_person_id, limit: 3})
            // }
            this.birthday = date.formatDate(this.account_info.data.personal_info.birthday, 'MMM DD, YYYY');
            this.date_registered = date.formatDate(this.account_info.data.personal_info.date_created, 'MMM DD, YYYY');
            if (this.account_info.data.personal_info.category == 'Visitor') {
                this.identification_info = await this.$_post(postGetIdentification, {person_id: this.$route.params.account_info._id});
                console.log(this.identification_info.data);
            }
        }
        else{
            // this.account_info = await this.$_post(postGetPerson, {id: this.$route.params.daily_logs_info._id});
            //this.person_logs = await this.$_post(postGetLogs,{ id: this.$route.params.daily_logs_info.frontdesk_person_id, limit: 10})
            let start = new Date(this.start_date)
            let end = new Date(this.end_date)
            end = end.setDate(end.getDate() + 1)
            await this.getLogs({find_logs : {id: this.$route.params.daily_logs_info.frontdesk_person_id, date_created: { '$gt' : start , '$lt' : end},limit:10}})
            // await this.getStaffList({find_person: {category: 'Staff', date_created: { '$gt' : start , '$lt' : end}}})
            
        }
        
    }

}
</script>
