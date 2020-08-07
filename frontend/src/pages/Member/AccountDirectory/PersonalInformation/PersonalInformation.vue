<template>
    <div class="personal-info">
        <div class="personal-info__header">
            <q-btn @click="back" class="btn-back btn-outline" flat dense no-caps label="Back"></q-btn>
            <div class="personal-info__header-btn">
                <q-btn @click="removeAccount()" class="btn-outline btn-remove" flat dense no-caps label="Remove"></q-btn>
                <q-btn @click="editAccount()" class="btn-primary btn-edit" flat dense no-caps label="Edit"></q-btn>
            </div>
        </div>

        <div class="personal-info__container content__box">
            <div class="personal-info__holder">
                <div class="personal-info__content-header">
                    <q-icon name="mdi-apple-icloud" size="30px"></q-icon>
                    <div class="content__title">Healthcloud Information</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=387&q=80">
                            <q-btn flat dense rounded icon="mdi-magnify" size="13px"></q-btn>
                        </q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">First Name:</div>
                                    <div class="personal-info__item-info">John</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Last Name:</div>
                                    <div class="personal-info__item-info">Doe</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Middle Name:</div>
                                    <div class="personal-info__item-info">fsdfsd</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Gender:</div>
                                    <div class="personal-info__item-info">sdfsfs</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Birth Date:</div>
                                    <div class="personal-info__item-info">sdfsdfsdfsdf</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Age:</div>
                                    <div class="personal-info__item-info">sdfsdfsdf</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Nationality:</div>
                                    <div class="personal-info__item-info">sdfsdfsdf</div>
                                </div>
                            </div>
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Home Address:</div>
                                    <div class="personal-info__item-info">sdfsdfds</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Contact Number:</div>
                                    <div class="personal-info__item-info">sdfsdfsd</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Emergency Contact Number:</div>
                                    <div class="personal-info__item-info">sdfsdfsd</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-briefcase" size="20px"></q-icon>
                    <div class="content__title">Data Source</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=387&q=80"></q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Company Name:</div>
                                    <div class="personal-info__item-info">dfgdfgdfg</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Parent:</div>
                                    <div class="personal-info__item-info">dfgdfgdfg</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Date Registered:</div>
                                    <div class="personal-info__item-info">sdfsdfsdfdsf</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Total Registered:</div>
                                    <div class="personal-info__item-info">32</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">Devices:</div>
                                    <div class="personal-info__item-info">sdfsdfsdf</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-card-account-details" size="20px"></q-icon>
                    <div class="content__title">Registered Identification Card</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=387&q=80"></q-img>
                        <div class="personal-info__item-content">
                            <div class="item-content">
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">ID Type:</div>
                                    <div class="personal-info__item-info">erwerwer</div>
                                </div>
                                <div class="personal-info__item">
                                    <div class="personal-info__item-label">ID Number:</div>
                                    <div class="personal-info__item-info">fdfsdfsdfds</div>
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
        <div class="personal-info__container content__box" style="margin-top: 30px">
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
                            <th>Device ID</th>
                            <th>Company/Location Scanned</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.person_logs">
                        <tr v-for="(logs, index) in this.person_logs.data" :key="index">
                            <td>{{new Date(logs.currentTime * 1000).toString()}}</td>
                            <td class="td-green">{{logs.tempratrue}}°C</td>
                            <td>{{logs.device_id}}</td>
                            <td>Green Sun Hotel</td>
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
import { postRemoveAccount , postGetCompany, postGetDevice, postGetPerson, postGetLogs} from '../../../../references/url';

export default {
     data: () => ({
        account_info: {},
        company_device: 0,
        company_info: {},
        person_logs: {}
    }),

    methods:
    {
        back()
        {
            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory_staff"})
            else if (this.account_info.type == 'Blacklist') this.$router.push({name: "member_accountdirectory_blacklist"})
            else if (this.account_info.type == 'Visitor') this.$router.push({name: "member_accountdirectory_visitor"})
        },
        getImgUrl(path){

            return "http://localhost:4001/images/"+path;
        },
        async removeAccount()
        {
            await this.$_post(postRemoveAccount, {id: this.$route.params.account_info._id , type: this.account_info.type});

            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory_staff"})
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
                    account_info: this.account_info,
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

        this.account_info = await this.$_post(postGetPerson, {id: this.$route.params.account_info._id})
        this.account_info.type = this.$route.params.account_info.type
        await this.getDeviceNumber(this.account_info.data.personal_info.company_name ? this.account_info.data.personal_info.company_name : '')
        if (this.account_info.data.personal_info.company_id)
        {
            this.company_info = await this.getCompany(this.account_info.data.personal_info.company_id)
            this.company_info.data.parent_company =  await this.getParentCompany(this.company_info.data.parent_id)
        }

        if (this.account_info.data.personal_info.frontdesk_person_id)
        {
            this.person_logs = await this.$_post(postGetLogs,{ id: this.account_info.data.personal_info.frontdesk_person_id, limit: 3})
        }

    }

}
</script>
